document.addEventListener('DOMContentLoaded', function() {
    const existingIcons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    existingIcons.forEach(el => el.remove());

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    // 建議使用絕對路徑，若在同層級則維持 favicon.ico
    favicon.href = 'favicon.ico';
    favicon.type = 'image/x-icon';
    document.head.appendChild(favicon);

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const isSearchPage = currentPage.includes('index.html') || currentPage === '';

    // 1. 產生導覽列結構（包含漢堡選單按鈕）
    const navHTML = `
        <div class="nav-wrapper">
            <nav class="global-nav">
                <div class="nav-container">
                    <div class="nav-brand">四字成語暨詞彙查詢系統</div>
                    
                    <!-- 漢堡按鈕 -->
                    <button class="nav-toggle" id="navToggle" aria-label="切換選單">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div class="nav-links" id="navLinks">
                        <a href="index.html" class="${isSearchPage ? 'active' : ''}">成語查詢</a>
                        <a href="game.html" class="${currentPage.includes('game.html') ? 'active' : ''}">擂台挑戰</a>
                    </div>
                </div>
            </nav>
            
            ${isSearchPage ? `
            <div class="search-subnav" id="searchSubNav">
                <div class="subnav-container">
                    <span class="subnav-label">快速篩選</span>
                    <div class="mini-grid">
                        <input type="text" class="input-mini" data-index="0" maxlength="1" placeholder="">
                        <input type="text" class="input-mini" data-index="1" maxlength="1" placeholder="">
                        <input type="text" class="input-mini" data-index="2" maxlength="1" placeholder="">
                        <input type="text" class="input-mini" data-index="3" maxlength="1" placeholder="">
                    </div>
                </div>
            </div>
            ` : ''}
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. 處理漢堡選單點擊
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('is-active');
            navLinks.classList.toggle('is-visible');
        });
    }

    // 3. 處理搜尋頁面邏輯
    if (isSearchPage) {
        const subNav = document.getElementById('searchSubNav');
        const miniInputs = document.querySelectorAll('.input-mini');
        
        window.addEventListener('scroll', () => {
            const mainSearchSection = document.getElementById('mainSearchSection');
            if (mainSearchSection) {
                const rect = mainSearchSection.getBoundingClientRect();
                if (rect.bottom < 60) {
                    subNav.classList.add('visible');
                } else {
                    subNav.classList.remove('visible');
                }
            }
        });

        miniInputs.forEach((mini, idx) => {
            mini.addEventListener('input', (e) => {
                const val = e.target.value;
                document.querySelectorAll(`[data-index="${idx}"]`).forEach(el => {
                    if (el !== e.target) el.value = val;
                });
                if (typeof showResults === 'function') showResults();
            });

            mini.addEventListener('keyup', (e) => {
                if (e.target.value.length >= 1 && e.key !== 'Backspace') {
                    const next = miniInputs[idx + 1];
                    if (next) next.focus();
                }
            });
        });
    }
});