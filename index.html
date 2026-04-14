<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Healthy Pace - 健康餐上傳系統</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['"Noto Sans TC"', 'sans-serif'] },
                    colors: { brand: { light: '#E8F3E8', DEFAULT: '#8DAA91', dark: '#6B8A6F' }, accent: '#A67C52' }
                }
            }
        }
    </script>
    <style>
        body { font-family: 'Noto Sans TC', sans-serif; background-color: #F8FAF8; }
        .upload-area.dragover { background-color: #E8F3E8; border-color: #8DAA91; }
        .loader { border: 4px solid #f3f3f3; border-top: 4px solid #8DAA91; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
        .loader-small { border: 3px solid #e5e7eb; border-top: 3px solid #8DAA91; border-radius: 50%; width: 22px; height: 22px; animation: spin 1s linear infinite; display: inline-block; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes cardIn { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }
        .card-enter { animation: cardIn 0.25s ease-out; }
        .step-transition { transition: all 0.3s ease-in-out; }
        /* 縮圖區塊：固定高度，object-cover */
        .thumb-img { display: block; width: 100%; height: 144px; object-fit: cover; background: #f1f5f9; }
        .thumb-placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 144px; background: #f1f5f9; color: #94a3b8; font-size: 0.75rem; }
    </style>
</head>
<body class="text-slate-700 min-h-screen flex flex-col">

<header class="bg-white shadow-sm py-6 px-4 text-center border-b-4 border-brand">
    <h1 class="text-3xl font-bold text-brand-dark mb-1">Healthy Pace <i class="fa-solid fa-leaf text-brand"></i></h1>
    <p class="text-sm text-slate-500 font-medium">你的專屬健康配速員</p>
</header>

<main class="flex-grow flex flex-col items-center p-4">

    <div id="lockedStatus" class="hidden w-full max-w-2xl bg-brand-dark text-white rounded-xl shadow-md p-4 mb-4 flex justify-between items-center">
        <div>
            <span class="text-xs text-brand-light opacity-80 block mb-1">目前鎖定存檔位置</span>
            <div class="font-bold text-sm"><i class="fa-regular fa-folder-open mr-2"></i><span id="displayFolderPath">載入中...</span></div>
        </div>
        <button id="switchUserBtn" class="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors">切換使用者</button>
    </div>

    <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-2xl">

        <!-- STEP 1：設定資料夾 -->
        <div id="step1-folderSetup" class="step-transition">
            <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <span class="bg-brand text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                設定個人專屬資料夾
            </h2>
            <div class="space-y-4 mb-6">
                <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">您的姓名</label>
                    <input type="text" id="userName" placeholder="請輸入真實中文姓名"
                           class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand">
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-600 mb-1">申請月份</label>
                    <input type="month" id="applyMonth"
                           class="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand bg-white">
                    <p class="text-xs text-slate-400 mt-1">系統將在指定月份中建立您的專屬資料夾</p>
                </div>
            </div>
            <div id="folderError" class="hidden text-red-500 text-sm mb-4 font-medium">
                <i class="fa-solid fa-circle-exclamation mr-1"></i>請完整填寫姓名與月份！
            </div>
            <button id="connectFolderBtn"
                    class="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md flex justify-center items-center">
                連線並鎖定資料夾 <i class="fa-solid fa-link ml-2"></i>
            </button>
        </div>

        <div id="step1-loading" class="hidden py-10 text-center flex flex-col items-center justify-center step-transition">
            <div class="loader mb-4"></div>
            <h3 class="text-lg font-bold text-slate-800">正在連接 Google Drive...</h3>
            <p class="text-slate-500 text-sm mt-1">搜尋主目錄並確認個人資料夾狀態</p>
        </div>

        <!-- STEP 2：上傳 + 分析 + 命名 -->
        <div id="step2-upload" class="hidden step-transition">
            <h2 class="text-xl font-bold text-slate-800 mb-5 flex items-center">
                <span class="bg-brand text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                上傳餐點照片
            </h2>

            <!-- 上傳區（無照片時顯示大框） -->
            <div id="uploadFull"
                 class="upload-area border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                <i class="fa-solid fa-cloud-arrow-up text-4xl text-slate-400 mb-3"></i>
                <p class="text-slate-600 font-medium">點擊上傳或將照片拖曳至此</p>
                <p class="text-slate-400 text-sm mt-1">照片會直接存入您的雲端資料夾，最多 30 張</p>
            </div>

            <!-- 有照片後的緊湊上傳列 -->
            <div id="uploadCompact" class="hidden flex items-center justify-between py-2 px-1 mb-1">
                <span class="text-sm text-slate-500">
                    <i class="fa-solid fa-images mr-1 text-brand"></i>
                    已選擇 <span id="counterNum" class="font-bold text-slate-700">0</span> / 30 張
                </span>
                <button id="addMoreBtn" class="text-brand hover:text-brand-dark text-sm font-medium">
                    <i class="fa-solid fa-plus mr-1"></i>新增更多
                </button>
            </div>

            <input type="file" id="fileInput" class="hidden" accept="image/*" multiple>

            <!-- 上傳中提示 -->
            <div id="processingFiles" class="hidden flex items-center justify-center gap-2 py-3 text-sm text-slate-500">
                <div class="loader-small"></div>
                <span id="processingText">正在上傳照片...</span>
            </div>

            <!-- 全域錯誤提示 -->
            <div id="globalError" class="hidden bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mt-2">
                <i class="fa-solid fa-circle-exclamation mr-1"></i><span id="globalErrorMsg"></span>
            </div>

            <!-- 卡片網格 -->
            <div id="cardGrid" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"></div>

            <!-- 進度條 -->
            <div id="progressArea" class="hidden mt-4">
                <div class="flex justify-between text-sm text-slate-600 mb-1.5">
                    <span id="progressLabel">處理中...</span>
                    <span id="progressCount">0/0</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div id="progressBar" class="bg-brand h-2 rounded-full transition-all duration-300" style="width:0%"></div>
                </div>
            </div>

            <!-- 動作按鈕 -->
            <div id="actionBtns" class="hidden mt-5 space-y-2.5">
                <button id="analyzeAllBtn"
                        class="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md flex justify-center items-center">
                    <i class="fa-solid fa-wand-magic-sparkles mr-2"></i>AI 檢視全部
                </button>
                <button id="renameAllBtn"
                        class="hidden w-full bg-accent hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md flex justify-center items-center">
                    <i class="fa-solid fa-pen-to-square mr-2"></i>確認並儲存命名
                </button>
            </div>
        </div>

        <!-- STEP 3：完成 -->
        <div id="step3-success" class="hidden py-8 text-center step-transition">
            <i class="fa-solid fa-cloud-check text-6xl text-brand mb-4"></i>
            <h2 class="text-2xl font-bold text-slate-800 mb-2">命名完成！</h2>
            <p id="successMsg" class="text-slate-500 mb-6">照片已安全儲存並命名完成。</p>
            <button id="continueBtn"
                    class="bg-brand text-white font-bold py-2 px-6 rounded-lg transition-colors shadow hover:bg-brand-dark">
                繼續上傳更多
            </button>
        </div>

    </div>
</main>

<footer class="text-center py-6 text-slate-400 text-sm">
    &copy; Healthy Pace Project. Designed for Effortless Health.
</footer>

<script>
// ================================================================
//  全域錯誤攔截
// ================================================================
window.onerror = function(msg, url, line) {
    console.error('[GE]', msg, 'L' + line);
    showGlobalError('錯誤：' + msg);
    return false;
};
window.addEventListener('unhandledrejection', function(e) {
    var msg = e.reason && e.reason.message ? e.reason.message : String(e.reason);
    console.error('[UPR]', msg);
    showGlobalError('錯誤：' + msg);
});
function showGlobalError(msg) {
    var el = document.getElementById('globalError');
    var msgEl = document.getElementById('globalErrorMsg');
    if (el && msgEl) {
        msgEl.textContent = msg;
        el.classList.remove('hidden');
        setTimeout(function() { el.classList.add('hidden'); }, 8000);
    }
}

// ================================================================
//  State
// ================================================================
var globalFolderId = null;
var items = [];       // { id, fileId, aiResult, foodName, status, errorMsg }
var nextId = 0;
var isBusy = false;

var STATUS = {
    uploading: { border:'border-blue-200',  badge:'bg-blue-50 text-blue-500',    icon:'',                        label:'上傳中...', overlay:true },
    pending:   { border:'border-slate-200', badge:'bg-slate-100 text-slate-500', icon:'fa-clock',                label:'待分析' },
    analyzing: { border:'border-slate-300', badge:'bg-white/90 text-slate-500',  icon:'',                        label:'分析中...', overlay:true },
    pass:      { border:'border-green-300', badge:'bg-green-100 text-green-700', icon:'fa-circle-check',         label:'符合標準' },
    warning:   { border:'border-amber-300', badge:'bg-amber-100 text-amber-700', icon:'fa-triangle-exclamation', label:'不符標準' },
    error:     { border:'border-red-300',   badge:'bg-red-100 text-red-600',     icon:'fa-circle-xmark',         label:'失敗' },
    done:      { border:'border-green-300', badge:'bg-green-100 text-green-700', icon:'fa-circle-check',         label:'已儲存' }
};

// ================================================================
//  Utility
// ================================================================
function runServer(funcName) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    return new Promise(function(resolve, reject) {
        var runner = google.script.run.withSuccessHandler(resolve).withFailureHandler(reject);
        runner[funcName].apply(runner, args);
    });
}
function escapeHtml(str) {
    var d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}

// ================================================================
//  ★ 圖片處理：同時產生縮圖（顯示用）和上傳版（存 Drive 用）
//    createImageBitmap(file) 不走 img.src，GAS iframe 最相容
//    回傳 { uploadDataUrl, thumbnailDataUrl }
// ================================================================
function compressForUpload(file) {
    if (typeof createImageBitmap === 'function') {
        return createImageBitmap(file)
            .then(function(bmp) {
                var ow = bmp.width, oh = bmp.height;

                // 縮圖：寬 400px，等比例，JPEG 70%（給卡片顯示）
                var TW = 400;
                var ts = Math.min(1, TW / ow);
                var tc = document.createElement('canvas');
                tc.width = Math.round(ow * ts);
                tc.height = Math.round(oh * ts);
                tc.getContext('2d').drawImage(bmp, 0, 0, tc.width, tc.height);
                var thumbnailDataUrl = tc.toDataURL('image/jpeg', 0.70);

                // 上傳版：最寬 1200px，JPEG 80%（存 Drive，送 Gemini）
                var UW = Math.min(ow, 1200);
                var uh = Math.round(oh * UW / ow);
                var uc = document.createElement('canvas');
                uc.width = UW; uc.height = uh;
                uc.getContext('2d').drawImage(bmp, 0, 0, UW, uh);
                var uploadDataUrl = uc.toDataURL('image/jpeg', 0.80);

                bmp.close();
                return { uploadDataUrl: uploadDataUrl, thumbnailDataUrl: thumbnailDataUrl };
            })
            .catch(function() {
                // createImageBitmap 失敗：直接用 FileReader raw（縮圖也用同一份）
                return readFileRaw(file).then(function(raw) {
                    return { uploadDataUrl: raw, thumbnailDataUrl: raw };
                });
            });
    }
    // 備援：FileReader
    return readFileRaw(file).then(function(raw) {
        return { uploadDataUrl: raw, thumbnailDataUrl: raw };
    });
}
function readFileRaw(file) {
    return new Promise(function(resolve, reject) {
        var r = new FileReader();
        r.onload  = function(e) { resolve(e.target.result); };
        r.onerror = function()  { reject(new Error('FileReader 失敗')); };
        r.readAsDataURL(file);
    });
}

// ================================================================
//  Card Rendering
//  ★ 圖片改用 <img> + Drive thumbnail URL（不再需要 canvas）
//    Drive thumbnail URL 格式：
//    https://drive.google.com/thumbnail?id=FILE_ID&sz=w400
//    使用者已登入 Google，瀏覽器會帶 cookie，直接可存取
// ================================================================
function createCardElement(item) {
    var cfg = STATUS[item.status] || STATUS.pending;
    var isDisabled = (item.status === 'done' || item.status === 'uploading' || item.status === 'analyzing');
    var showRemove = !isDisabled && !isBusy;

    var iconHtml = cfg.icon ? '<i class="fa-solid ' + cfg.icon + ' mr-1"></i>' : '';

    var overlayHtml = cfg.overlay
        ? '<div class="absolute inset-0 bg-white/60 flex items-center justify-center"><div class="loader-small"></div></div>'
        : '';

    var msgHtml = '';
    if (item.status === 'warning' && item.aiResult && item.aiResult.msg) {
        msgHtml = '<p class="text-xs text-amber-600 mb-1.5 leading-relaxed">'
            + '<i class="fa-solid fa-info-circle mr-1"></i>'
            + escapeHtml(item.aiResult.msg) + '</p>';
    }
    if (item.status === 'error') {
        msgHtml = '<div class="flex items-center justify-between mb-1.5">'
            + '<p class="text-xs text-red-500 truncate mr-2">' + escapeHtml(item.errorMsg || '未知錯誤') + '</p>'
            + (item.fileId
                ? '<button class="retry-btn text-xs text-brand hover:underline whitespace-nowrap font-medium">重試</button>'
                : '')
            + '</div>';
    }

    var card = document.createElement('div');
    card.className = 'meal-card rounded-xl border-2 overflow-hidden shadow-sm transition-all card-enter ' + cfg.border;
    card.dataset.id = item.id;

    // ★ 縮圖區塊：img（隱藏） + placeholder（備援）同時放入
    //    優先順序：item.thumbnailDataUrl > Drive thumbnail URL > 佔位文字
    var phLabel = (item.status === 'uploading')
        ? '<div class="loader-small mr-2"></div>上傳中...'
        : '<i class="fa-solid fa-image mr-1"></i>' + (item.fileId ? '圖片上傳成功' : '處理中');

    card.innerHTML =
        '<div class="relative">'
        + '<img class="thumb-img" alt="" style="display:none;">'
        + '<div class="thumb-placeholder">' + phLabel + '</div>'
        + (showRemove
            ? '<button class="remove-btn absolute top-1.5 right-1.5 bg-black/40 hover:bg-black/60 text-white w-6 h-6 rounded-full text-sm leading-none flex items-center justify-center transition-colors">&times;</button>'
            : '')
        + overlayHtml
        + '<span class="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm ' + cfg.badge + '">'
        +   iconHtml + cfg.label
        + '</span>'
        + '</div>'
        + '<div class="p-2.5">'
        + msgHtml
        + '<input type="text" class="food-input w-full px-2.5 py-1.5 text-sm border border-slate-200 rounded-lg '
        +   'focus:outline-none focus:ring-2 focus:ring-brand transition-all" '
        +   'value="' + escapeHtml(item.foodName) + '" placeholder="食物名稱（AI 分析後自動填入）" '
        +   (isDisabled ? 'disabled' : '') + '>'
        + '</div>';

    // ★ 嘗試載入縮圖（本地 thumbnail 優先，否則試 Drive URL）
    var thumbImg = card.querySelector('.thumb-img');
    var thumbPh  = card.querySelector('.thumb-placeholder');

    function tryShowThumb(src) {
        thumbImg.onload = function() {
            thumbImg.style.display = 'block';
            if (thumbPh) thumbPh.style.display = 'none';
        };
        thumbImg.onerror = function() {
            thumbImg.style.display = 'none';
            if (thumbPh) thumbPh.style.display = 'flex';
        };
        thumbImg.src = src;
    }

    if (item.thumbnailDataUrl) {
        tryShowThumb(item.thumbnailDataUrl);
    } else if (item.fileId) {
        // 備援：Drive thumbnail（可能因 cookie 設定而失效，失敗就顯示文字）
        tryShowThumb('https://drive.google.com/thumbnail?id=' + item.fileId + '&sz=w400');
    }

    // Events
    var removeBtn = card.querySelector('.remove-btn');
    if (removeBtn) removeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); removeItem(item.id);
    });

    var input = card.querySelector('.food-input');
    if (input) input.addEventListener('input', function(e) {
        item.foodName = e.target.value; updateActionButtons();
    });

    var retryBtn = card.querySelector('.retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', function() { retryAnalyze(item); });

    return card;
}

function updateCard(id) {
    var item = null;
    for (var i = 0; i < items.length; i++) { if (items[i].id === id) { item = items[i]; break; } }
    if (!item) return;

    var oldCard = document.querySelector('.meal-card[data-id="' + id + '"]');
    if (!oldCard) return;

    // 保留使用者輸入的食物名稱（只在使用者有實際輸入時才覆蓋，避免蓋掉 AI 填入的值）
    var oldInput = oldCard.querySelector('.food-input');
    if (oldInput && oldInput.value.trim() && item.status !== 'uploading' && item.status !== 'analyzing') {
        item.foodName = oldInput.value.trim();
    }
    oldCard.replaceWith(createCardElement(item));
}

// ================================================================
//  UI Updates
// ================================================================
function updateUploadArea() {
    var full    = document.getElementById('uploadFull');
    var compact = document.getElementById('uploadCompact');
    if (items.length === 0) {
        full.classList.remove('hidden');
        compact.classList.add('hidden');
    } else {
        full.classList.add('hidden');
        compact.classList.remove('hidden');
        document.getElementById('counterNum').textContent = items.length;
        document.getElementById('addMoreBtn').style.display = items.length >= 30 ? 'none' : '';
    }
}

function updateActionButtons() {
    var pendingCount  = 0; // 等待分析
    var analyzedCount = 0; // 已分析
    var namedCount    = 0; // 已分析 + 有名字
    var uploadingCount = 0;

    for (var i = 0; i < items.length; i++) {
        var s = items[i].status;
        if (s === 'uploading') uploadingCount++;
        if (s === 'pending' || s === 'error') pendingCount++;
        if (s === 'pass' || s === 'warning') {
            analyzedCount++;
            if (items[i].foodName && items[i].foodName.trim()) namedCount++;
        }
    }

    var wrap = document.getElementById('actionBtns');
    var aBtn = document.getElementById('analyzeAllBtn');
    var rBtn = document.getElementById('renameAllBtn');

    if (items.length === 0) { wrap.classList.add('hidden'); return; }
    wrap.classList.remove('hidden');

    // AI 分析按鈕：有待分析的、不在忙碌、無上傳中
    if (pendingCount > 0 && !isBusy && uploadingCount === 0) {
        aBtn.classList.remove('hidden'); aBtn.disabled = false;
        aBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>AI 檢視全部 (' + pendingCount + '張)';
    } else {
        aBtn.classList.add('hidden');
    }

    // 確認命名按鈕：有已分析的、不在忙碌
    if (analyzedCount > 0 && !isBusy && uploadingCount === 0) {
        rBtn.classList.remove('hidden'); rBtn.disabled = false;
        var label = namedCount === analyzedCount
            ? '確認並儲存命名 (' + namedCount + '張)'
            : '確認並儲存命名 (' + namedCount + '/' + analyzedCount + '張已填名)';
        rBtn.innerHTML = '<i class="fa-solid fa-pen-to-square mr-2"></i>' + label;
    } else {
        rBtn.classList.add('hidden');
    }
}

function showProgress(label, cur, total) {
    document.getElementById('progressArea').classList.remove('hidden');
    document.getElementById('progressLabel').textContent  = label;
    document.getElementById('progressCount').textContent  = cur + '/' + total;
    document.getElementById('progressBar').style.width    = (total > 0 ? (cur / total * 100) : 0) + '%';
}
function hideProgress() { document.getElementById('progressArea').classList.add('hidden'); }

// ================================================================
//  ★ 新增照片：壓縮 → 上傳到 Drive → 取得 fileId → 顯示卡片
//    圖片縮圖由 Drive thumbnail URL 提供，不再需要 canvas
// ================================================================
function addFiles(fileList) {
    var fileArr = [];
    for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].type && fileList[i].type.match(/^image\//)) fileArr.push(fileList[i]);
    }
    fileArr = fileArr.slice(0, 30 - items.length);
    if (fileArr.length === 0) return;

    document.getElementById('processingFiles').classList.remove('hidden');
    document.getElementById('globalError').classList.add('hidden');

    function uploadNext(index) {
        if (index >= fileArr.length) {
            document.getElementById('processingFiles').classList.add('hidden');
            updateUploadArea();
            updateActionButtons();
            return;
        }

        var file = fileArr[index];
        document.getElementById('processingText').textContent =
            '正在上傳 (' + (index + 1) + '/' + fileArr.length + ')...';

        // 建立佔位卡片（status: uploading，thumbnailDataUrl 尚未產生）
        var item = {
            id: nextId++, fileId: null, thumbnailDataUrl: null,
            aiResult: null, foodName: '', status: 'uploading', errorMsg: null
        };
        items.push(item);
        document.getElementById('cardGrid').appendChild(createCardElement(item));
        updateUploadArea();

        // ① 壓縮（產生縮圖 + 上傳版）→ ② 顯示縮圖 → ③ 上傳 Drive
        compressForUpload(file)
            .then(function(result) {
                // 縮圖立刻顯示（不等上傳完成）
                item.thumbnailDataUrl = result.thumbnailDataUrl;
                updateCard(item.id);
                // 上傳壓縮版到 Drive
                return runServer('uploadFileToFolder', result.uploadDataUrl, globalFolderId);
            })
            .then(function(result) {
                item.fileId = result.fileId;
                item.status = 'pending';
                updateCard(item.id);
            })
            .catch(function(err) {
                console.error('[upload #' + index + ']', err);
                item.status = 'error';
                item.errorMsg = '上傳失敗：' + (err.message || String(err));
                updateCard(item.id);
            })
            .then(function() {
                uploadNext(index + 1);
            });
    }

    uploadNext(0);
}

function removeItem(id) {
    items = items.filter(function(i) { return i.id !== id; });
    var card = document.querySelector('.meal-card[data-id="' + id + '"]');
    if (card) card.remove();
    updateUploadArea();
    updateActionButtons();
}

// ================================================================
//  AI 分析（從 Drive 讀取，前端只傳 fileId）
// ================================================================
function analyzeAll() {
    var pending = items.filter(function(i) {
        return (i.status === 'pending' || i.status === 'error') && i.fileId;
    });
    if (pending.length === 0) return;

    isBusy = true;
    showProgress('AI 分析中', 0, pending.length);
    updateActionButtons();

    function analyzeNext(index) {
        if (index >= pending.length) {
            isBusy = false; hideProgress(); updateActionButtons(); return;
        }
        var item = pending[index];
        item.status = 'analyzing'; item.errorMsg = null;
        updateCard(item.id);
        showProgress('AI 分析中', index, pending.length);

        runServer('analyzeMealWithGemini', item.fileId)
            .then(function(result) {
                item.aiResult = result;
                item.status   = (result.status === 'pass') ? 'pass' : 'warning';
                if (result.food_name) item.foodName = result.food_name;
            })
            .catch(function(err) {
                item.status   = 'error';
                item.errorMsg = err.message || '分析失敗';
            })
            .then(function() {
                updateCard(item.id);
                showProgress('AI 分析中', index + 1, pending.length);
                analyzeNext(index + 1);
            });
    }
    analyzeNext(0);
}

function retryAnalyze(item) {
    if (!item.fileId) { showGlobalError('此照片上傳失敗，無法重試分析'); return; }
    item.status = 'analyzing'; item.errorMsg = null;
    updateCard(item.id);
    runServer('analyzeMealWithGemini', item.fileId)
        .then(function(result) {
            item.aiResult = result;
            item.status   = (result.status === 'pass') ? 'pass' : 'warning';
            if (result.food_name) item.foodName = result.food_name;
        })
        .catch(function(err) { item.status = 'error'; item.errorMsg = err.message || '分析失敗'; })
        .then(function() { updateCard(item.id); updateActionButtons(); });
}

// ================================================================
//  ★ 確認命名：呼叫 GAS renameFile，在 Drive 中改名
// ================================================================
function renameAll() {
    var ready = items.filter(function(i) {
        return (i.status === 'pass' || i.status === 'warning') && i.fileId;
    });

    // 檢查是否所有已分析的照片都有名字
    var missing = ready.filter(function(i) { return !i.foodName || !i.foodName.trim(); });
    if (missing.length > 0) {
        missing.forEach(function(item) {
            var inp = document.querySelector('.meal-card[data-id="' + item.id + '"] .food-input');
            if (inp) {
                inp.classList.add('ring-2', 'ring-red-500');
                inp.placeholder = '⚠ 請輸入食物名稱';
                setTimeout(function() { inp.classList.remove('ring-2', 'ring-red-500'); }, 2500);
            }
        });
        var fc = document.querySelector('.meal-card[data-id="' + missing[0].id + '"]');
        if (fc) fc.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    if (ready.length === 0) return;

    isBusy = true;
    showProgress('儲存命名中', 0, ready.length);
    updateActionButtons();
    var successCount = 0;

    function renameNext(index) {
        if (index >= ready.length) {
            isBusy = false; hideProgress();
            var allDone = items.every(function(i) { return i.status === 'done' || i.status === 'error'; });
            if (allDone && successCount > 0) {
                document.getElementById('step2-upload').classList.add('hidden');
                document.getElementById('step3-success').classList.remove('hidden');
                document.getElementById('successMsg').textContent =
                    '成功命名 ' + successCount + ' 張照片，已儲存在您的雲端資料夾。';
            } else { updateActionButtons(); }
            return;
        }

        var item = ready[index];
        // 讀取輸入框的最新值（使用者可能改過）
        var inp = document.querySelector('.meal-card[data-id="' + item.id + '"] .food-input');
        var name = (inp ? inp.value : item.foodName).trim();
        item.foodName = name;

        showProgress('儲存命名中', index, ready.length);
        runServer('renameFile', item.fileId, name)
            .then(function() { item.status = 'done'; successCount++; })
            .catch(function(err) { item.status = 'error'; item.errorMsg = err.message || '改名失敗'; })
            .then(function() {
                updateCard(item.id);
                showProgress('儲存命名中', index + 1, ready.length);
                renameNext(index + 1);
            });
    }
    renameNext(0);
}

// ================================================================
//  Event Listeners
// ================================================================
(function init() {
    var fileInput  = document.getElementById('fileInput');
    var uploadFull = document.getElementById('uploadFull');
    var addMoreBtn = document.getElementById('addMoreBtn');

    uploadFull.addEventListener('click', function() { fileInput.click(); });
    addMoreBtn.addEventListener('click', function() { fileInput.click(); });

    uploadFull.addEventListener('dragover',  function(e) { e.preventDefault(); uploadFull.classList.add('dragover'); });
    uploadFull.addEventListener('dragleave', function()  { uploadFull.classList.remove('dragover'); });
    uploadFull.addEventListener('drop', function(e) {
        e.preventDefault(); uploadFull.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) addFiles(e.target.files);
        setTimeout(function() { fileInput.value = ''; }, 500);
    });

    document.getElementById('analyzeAllBtn').addEventListener('click', function() { analyzeAll(); });
    document.getElementById('renameAllBtn').addEventListener('click',  function() { renameAll(); });

    document.getElementById('continueBtn').addEventListener('click', function() {
        items = []; nextId = 0;
        document.getElementById('cardGrid').innerHTML = '';
        document.getElementById('step3-success').classList.add('hidden');
        document.getElementById('step2-upload').classList.remove('hidden');
        updateUploadArea(); updateActionButtons();
    });

    document.getElementById('switchUserBtn').addEventListener('click', function() {
        document.getElementById('lockedStatus').classList.add('hidden');
        document.getElementById('step2-upload').classList.add('hidden');
        document.getElementById('step3-success').classList.add('hidden');
        document.getElementById('step1-folderSetup').classList.remove('hidden');
        globalFolderId = null; items = []; nextId = 0;
        document.getElementById('userName').value = '';
        document.getElementById('cardGrid').innerHTML = '';
    });

    document.getElementById('connectFolderBtn').addEventListener('click', function() {
        var userName   = document.getElementById('userName').value.trim();
        var applyMonth = document.getElementById('applyMonth').value;
        if (!userName || !applyMonth) {
            document.getElementById('folderError').classList.remove('hidden'); return;
        }
        document.getElementById('folderError').classList.add('hidden');
        document.getElementById('step1-folderSetup').classList.add('hidden');
        document.getElementById('step1-loading').classList.remove('hidden');

        google.script.run
            .withSuccessHandler(function(result) {
                globalFolderId = result.folderId;
                document.getElementById('displayFolderPath').textContent =
                    result.actualMonthName + ' / ' + userName;
                document.getElementById('lockedStatus').classList.remove('hidden');
                document.getElementById('step1-loading').classList.add('hidden');
                document.getElementById('step2-upload').classList.remove('hidden');
            })
            .withFailureHandler(function(error) {
                alert('連線資料夾失敗：' + error.message);
                document.getElementById('step1-loading').classList.add('hidden');
                document.getElementById('step1-folderSetup').classList.remove('hidden');
            })
            .getOrCreateUserFolder(applyMonth, userName);
    });
})();
</script>
</body>
</html>
