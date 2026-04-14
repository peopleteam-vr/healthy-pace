const ROOT_FOLDER_ID = '17D005J0I1pscOu1RCzOOu_R9Cyf4i7bt';
// 從 Google 專案設定中安全地讀取 Key
const GEMINI_API_KEY = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');

// ★ 模型降級清單（5個輪流，遇到忙碌自動切換）
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-001',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash-lite'
];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Healthy Pace - 健康配速員')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ================================================================
//  建立/尋找資料夾並回傳檔案數
// ================================================================
function getOrCreateUserFolder(monthStr, userName) {
  var root = DriveApp.getFolderById(ROOT_FOLDER_ID);
  var monthPrefix = monthStr.replace('-', '');

  var monthFolder = null;
  var folders = root.getFolders();
  while (folders.hasNext()) {
    var f = folders.next();
    if (f.getName().startsWith(monthPrefix)) {
      monthFolder = f;
      break;
    }
  }
  if (!monthFolder) {
    monthFolder = root.createFolder(monthPrefix);
  }

  var userFolder;
  var userFoldersIter = monthFolder.getFoldersByName(userName);
  if (userFoldersIter.hasNext()) {
    userFolder = userFoldersIter.next();
  } else {
    userFolder = monthFolder.createFolder(userName);
  }

  var fileCount = 0;
  var fileIter = userFolder.getFiles();
  while (fileIter.hasNext()) { fileIter.next(); fileCount++; }

  return {
    folderId: userFolder.getId(),
    fileCount: fileCount,
    actualMonthName: monthFolder.getName()
  };
}

// ================================================================
//  ★ 上傳照片到 Drive（前端壓縮後的 base64）
//    存入資料夾，回傳 fileId（改名在使用者確認後才執行）
// ================================================================
function uploadFileToFolder(base64Data, folderId) {
  var folder = DriveApp.getFolderById(folderId);
  var parts = base64Data.split(',');
  var contentType = parts[0].match(/:(.*?);/)[1] || 'image/jpeg';
  var bytes = Utilities.base64Decode(parts[1]);
  var tempName = 'meal_' + new Date().getTime() + '.jpg';
  var blob = Utilities.newBlob(bytes, contentType, tempName);
  var file = folder.createFile(blob);
  return { fileId: file.getId() };
}

// ================================================================
//  ★ 改名（使用者確認食物名稱後執行）
// ================================================================
function renameFile(fileId, newName) {
  DriveApp.getFileById(fileId).setName(newName + '.jpg');
  return true;
}

// ================================================================
//  ★ AI 判定
//    ★ 改為從 Drive 直接讀取照片（不再從前端傳 base64）
//    → 前端只傳 fileId，大幅減少 payload，避免 timeout
// ================================================================
function analyzeMealWithGemini(fileId) {
  // 從 Drive 讀取已上傳的照片
  var file = DriveApp.getFileById(fileId);
  var blob = file.getBlob();
  var pureBase64 = Utilities.base64Encode(blob.getBytes());
  var mimeType = blob.getContentType() || 'image/jpeg';

  var prompt = '你是一位專業營養師，請分析這張照片中的食物，判斷是否符合健康餐點標準。\n\n'
    + '【三步驟判定流程】\n\n'
    + '★ 步驟一：分別判斷 A、B、C 是否符合\n\n'
    + 'A. 纖維來源 — 符合以下任一項即算 A 通過：\n'
    + '   - 有全穀根莖類主食（地瓜、南瓜、玉米、雜糧飯、糙米、燕麥等非精製澱粉）\n'
    + '   - 有足夠蔬菜（約 1 拳頭以上：葉菜、蕈菇、筍、瓜類、蘿蔔、彩椒、海帶等）\n'
    + '   - 有水果 1 拳頭以上\n'
    + '   ※ 白飯、麵條、麵包、饅頭等精製澱粉，且蔬菜明顯很少 → A 不通過\n\n'
    + 'B. 蛋白質 — 符合以下任一項即算 B 通過：\n'
    + '   - 有豆類、魚、雞、鴨、海鮮、蛋、豆腐、豆干、低脂乳品等優質蛋白質，份量合理（非配料等級）\n'
    + '   - 有無糖豆漿一杯或嫩豆腐一盒以上\n'
    + '   ※ 份量標準從寬：只要蛋白質食材明顯存在（不是只有一小塊配料），就算 B 通過\n'
    + '   ※ 若有紅肉（豬牛羊）但無豆類搭配，B 仍算通過，但需在 msg 中提醒\n\n'
    + 'C. 油脂來源 — 以下情況算 C 通過（非常從寬）：\n'
    + '   - 有使用炒、煎、烤等需要油的料理方式 → 直接算 C 通過（無法從照片判斷油種）\n'
    + '   - 有堅果、酪梨、芝麻、奇亞籽等\n'
    + '   - 有魚類（天然含 omega-3）\n'
    + '   ※ 只有蒸煮水煮且完全無油脂來源，才考慮 C 不通過\n'
    + '   ※ 無法判斷油脂種類時，一律算 C 通過\n\n'
    + '★ 步驟二：計算 A+B+C 通過幾項\n\n'
    + '★ 步驟三：判斷 D、E、F（三項必要條件）\n\n'
    + 'D. 料理方式（必要）— 不符合才失敗：\n'
    + '   - ✗ 明顯裹粉油炸（炸雞、炸排骨、炸薯條等）\n'
    + '   - ✓ 其他方式（蒸煮炒烤滷）都通過\n\n'
    + 'E. 鈉含量（必要）— 不符合才失敗：\n'
    + '   - ✗ 大量醬汁淋飯、明顯重口味大量醬料、喝超大量湯\n'
    + '   - ✓ 少量醬料調味、一般烹調都通過；不確定一律算通過\n\n'
    + 'F. 原型食物（必要）— 不符合才失敗：\n'
    + '   - ✗ 以香腸、火腿、貢丸、火鍋料（魚板魚丸）、培根、肉鬆等加工品為主要食材\n'
    + '   - ✓ 偶爾少量加工品搭配大量原型食物，算通過；無法判斷一律算通過\n\n'
    + '【最終結論】\n'
    + '- pass 條件：A/B/C 通過 2 項（含）以上，且 D、E、F 全部通過\n'
    + '- warning 條件：A/B/C 只通過 1 項（含）以下，或 D/E/F 任一不通過\n\n'
    + '【常見案例說明】\n'
    + '- 白飯+雞腿+炒青菜少許（A✗ B✓ C✓ D✓ E✓ F✓）→ 2/3 → pass\n'
    + '- 白飯+雞腿+無蔬菜（A✗ B✓ C✓ D✓ E✓ F✓）→ 2/3 → pass，msg 可建議增加蔬菜\n'
    + '- 麵條+少量肉（A✗ B✗ C✓ D✓ E✓ F✓）→ 1/3 → warning\n'
    + '- 炸雞排+炸薯條（D✗）→ warning（料理方式不健康）\n\n'
    + '【通用從寬原則】\n'
    + '- 照片模糊、角度不佳、燈光不足 → 從寬\n'
    + '- 看不清楚的食材、無法判斷的調味 → 從寬\n'
    + '- 不確定是否符合某項時 → 從寬算符合\n\n'
    + '請回傳 JSON（只回傳 JSON，不要有任何其他文字）：\n'
    + '{\n'
    + '  "status": "pass" 或 "warning",\n'
    + '  "food_name": "簡短食物名稱（無論通過與否都必須填，2-8字，例如：雞腿飯+青菜、鮭魚餐盒）",\n'
    + '  "msg": "若 warning，一句話說明主要問題（直接說內容，不要說第幾項）；若 pass 可以是空字串，或給一句正向建議"\n'
    + '}';

  var lastError = null;

  // 共用 payload（每次呼叫時建立）
  var payload = {
    "contents": [{
      "parts": [
        { "text": prompt },
        { "inline_data": { "mime_type": mimeType, "data": pureBase64 } }
      ]
    }],
    "generationConfig": { "responseMimeType": "application/json" }
  };
  var fetchOptions = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };

  for (var m = 0; m < GEMINI_MODELS.length; m++) {
    var model = GEMINI_MODELS[m];
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model
              + ':generateContent?key=' + GEMINI_API_KEY;

    // ★ 改良重試策略：
    //   429/503（配額忙碌）→ 立即換下一個模型，不浪費時間在同一個上
    //   其他錯誤（網路/格式）→ 同一模型最多再試 1 次
    var switched = false;
    for (var attempt = 0; attempt < 2; attempt++) {
      if (attempt > 0) Utilities.sleep(2000); // 非配額錯誤才等 2 秒再試

      try {
        var response = UrlFetchApp.fetch(url, fetchOptions);
        var code = response.getResponseCode();
        var text = response.getContentText();

        if (code === 429 || code === 503) {
          // 配額滿：立刻換模型，稍等讓配額喘息
          lastError = new Error(model + ' 配額不足 (' + code + ')，嘗試下一個模型');
          Logger.log('[Gemini] ' + model + ' 回傳 ' + code + '，切換模型');
          Utilities.sleep(500);
          switched = true;
          break; // break 內層 attempt loop，進下一個 model
        }

        if (code !== 200) {
          lastError = new Error(model + ' API 錯誤 (' + code + '): ' + text.substring(0, 150));
          Logger.log('[Gemini] ' + model + ' 錯誤 ' + code);
          continue; // 同模型重試一次
        }

        var result = JSON.parse(text);
        if (result.candidates && result.candidates[0] &&
            result.candidates[0].content &&
            result.candidates[0].content.parts &&
            result.candidates[0].content.parts[0]) {
          var aiText = result.candidates[0].content.parts[0].text;
          aiText = aiText.replace(/```json|```/g, '').trim();
          Logger.log('[Gemini] ' + model + ' 成功');
          return JSON.parse(aiText);
        }

        lastError = new Error(model + ' 回傳格式不如預期');
        continue;

      } catch(e) {
        lastError = e;
        Logger.log('[Gemini] ' + model + ' 例外: ' + e.toString());
      }
    }
  }

  throw lastError || new Error('所有 AI 模型均無法回應，請稍後再試');
}
