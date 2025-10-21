class FeHeaderPartnership extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../styles.css">
      <div class="bg-base-surface-2 w-full border-b border-base-border">
        <div class="px-4 lg:px-6 py-4 w-full">
          <div id="main-header" class="flex items-center justify-between lg:justify-end w-full">
            <!-- Logo / Логотип (Mobile only) -->
            <img id="logo" src="../public/images/small_logo.png" alt="FE Платформа" class="h-15 lg:hidden" />

            <!-- Account Buttons / Кнопки аккаунта -->
            <div id="account-buttons" class="flex items-center gap-2">
              <!-- Balance Button / Кнопка баланса -->
              <button class="bg-base-surface-2 border border-base-border rounded-6 px-4 py-0 h-15 flex items-center gap-2.5 hover:bg-base-fill-1 transition-colors">
                <img src="../public/icons/coins.svg" alt="Баланс" class="w-6 h-6" />
                <span class="text-lg-semibold text-text-dark-primary">1 123 ₽</span>
              </button>

              <!-- Mobile Menu Button / Кнопка мобильного меню -->
              <button id="mobile-menu-button" class="bg-state-brand-active hover:bg-state-brand-hover text-white rounded-6 p-2 transition-colors duration-200 lg:hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Items / Элементы мобильного меню -->
      <div id="mobile-menu-items" class="fixed inset-0 bg-base-surface-1 z-50 hidden flex flex-col h-full">
        <!-- Menu Header -->
        <div class="flex items-center justify-between p-4 border-b border-base-border">
          <img src="../public/images/small_logo.png" alt="FE Платформа" class="h-15" />
          <button id="close-menu-button" class="bg-state-brand-active hover:bg-state-brand-hover text-white rounded-6 p-2 transition-colors duration-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <!-- Menu Content -->
        <div class="flex-1 overflow-auto p-4">
          <!-- Main Section -->
          <div class="flex flex-col gap-1">
            <a href="./site-settings.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Настройка сайта</span>
            </a>
            <a href="./pages.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Страницы</span>
            </a>
            <a href="./news.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Новости</span>
            </a>
            <a href="./domain-prices.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Цены на домены</span>
            </a>
            <a href="./hosting-prices.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Цены на хостинг</span>
            </a>
            <a href="./server-prices.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Цены на серверы</span>
            </a>
            <a href="./email-templates.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Шаблоны писем</span>
            </a>
            <a href="./promo-codes.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Промокоды</span>
            </a>
          </div>

          <!-- Analytics Section -->
          <div class="flex flex-col gap-1 mt-4">
            <h3 class="text-sm font-medium text-text-dark-secondary">Аналитика</h3>
            <a href="./client-list.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Список клиентов</span>
            </a>
            <a href="./partner-list.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Список парнтнеров</span>
            </a>
            <a href="./statistics.html" class="flex items-center gap-4 px-2 py-2.5 rounded-7 hover:bg-base-fill-1 transition-colors">
              <span class="text-base-medium text-text-dark-secondary">Статистика</span>
            </a>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="p-4">
          <button class="bg-base-surface-2 border border-base-border rounded-lg w-full h-15 flex items-center justify-center hover:bg-base-fill-1 transition-colors">
            <span class="text-base font-semibold text-text-dark-primary">Выйти</span>
          </button>
        </div>
      </div>
    `;

    // Initialize mobile menu
    this.initMobileMenu();
  }

  initMobileMenu() {
    const mobileMenuButton =
      this.shadowRoot.getElementById("mobile-menu-button");
    const mobileMenuItems = this.shadowRoot.getElementById("mobile-menu-items");
    const closeMenuButton = this.shadowRoot.getElementById("close-menu-button");

    if (mobileMenuButton && mobileMenuItems) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenuItems.classList.toggle("hidden");
      });
    }

    if (closeMenuButton && mobileMenuItems) {
      closeMenuButton.addEventListener("click", () => {
        mobileMenuItems.classList.add("hidden");
      });
    }
  }
}

customElements.define("fe-header-partnership", FeHeaderPartnership);
