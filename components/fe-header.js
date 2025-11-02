class FeHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const backLink = this.getAttribute('back-link');
    const backText = this.getAttribute('back-text') || 'Назад';
    const showLogo = this.getAttribute('show-logo') === 'true';

    this.shadowRoot.innerHTML = `
      <style>
        /* Используем CSS переменные из :root в input.css */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .header-container {
          background-color: var(--color-base-surface-2);
          width: 100%;
          border-bottom: 1px solid var(--color-base-border);
        }

        .header-inner {
          padding: 16px;
          width: 100%;
        }

        .header-inner.with-back {
          padding-left: 300px;
        }

        @media (max-width: 1024px) {
          .header-inner.with-back {
            padding-left: 16px;
          }
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          height: var(--spacing-15);
          display: block;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) {
          .logo {
            display: none;
          }
        }

        .logo.show-always {
          display: block;
        }

        .logo-desktop {
          height: 16px;
          width: auto;
        }

        .logo-mobile {
          height: var(--spacing-15);
          width: auto;
        }

        @media (min-width: 1024px) {
          .logo-mobile {
            display: none;
          }
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .back-link {
          display: none;
          align-items: center;
          gap: 8px;
          color: var(--color-text-dark-secondary);
          text-decoration: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--color-text-dark-primary);
        }

        @media (min-width: 1024px) {
          .back-link {
            display: flex;
          }
        }

        .account-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn {
          background-color: var(--color-base-surface-2);
          border: 1px solid var(--color-base-border);
          border-radius: var(--radius-6);
          padding: 0 16px;
          height: var(--spacing-15);
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
          font-family: var(--font-sans);
        }

        .btn:hover {
          background-color: var(--color-base-fill-1);
        }

        .btn-primary {
          background-color: var(--color-state-brand-active);
          border-color: transparent;
          color: var(--color-text-light-primary);
        }

        .btn-primary:hover {
          background-color: var(--color-state-brand-hover);
        }

        .btn-icon {
          width: 24px;
          height: 24px;
        }

        .btn-text {
          display: none;
          font-size: 18px;
          font-weight: 600;
          line-height: 28px;
          color: var(--color-text-dark-primary);
        }

        @media (min-width: 640px) {
          .btn-text {
            display: inline;
          }
        }

        .profile-btn {
          display: none;
        }

        @media (min-width: 1024px) {
          .profile-btn {
            display: flex;
          }
        }

        .mobile-menu-btn {
          display: flex;
          padding: 8px;
          border-radius: var(--radius-6);
        }

        @media (min-width: 1024px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background-color: var(--color-base-surface-1);
          z-index: 50;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .mobile-menu.hidden {
          display: none;
        }

        .menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid var(--color-base-border);
        }

        .menu-content {
          flex: 1;
          overflow: auto;
          padding: 16px;
        }

        .menu-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 16px;
        }

        .menu-section:first-child {
          margin-top: 0;
        }

        .menu-title {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-dark-secondary);
          margin-bottom: 4px;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 8px;
          border-radius: 12px;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .menu-link:hover {
          background-color: var(--color-base-fill-1);
        }

        .menu-link-icon {
          width: 24px;
          height: 24px;
          opacity: 0.7;
        }

        .menu-link-text {
          font-size: 16px;
          font-weight: 500;
          color: var(--color-text-dark-secondary);
        }

        .logout-container {
          padding: 16px;
        }

        .logout-btn {
          background-color: var(--color-base-surface-2);
          border: 1px solid var(--color-base-border);
          border-radius: 8px;
          width: 100%;
          height: var(--spacing-15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .logout-btn:hover {
          background-color: var(--color-base-fill-1);
        }

        .logout-text {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-dark-primary);
        }
      </style>
      <div class="header-container">
        <div class="header-inner ${backLink && !showLogo ? 'with-back' : ''}">
          <div class="header-content">
            <!-- Left Section / Левая секция -->
            <div class="left-section">
              ${showLogo ? `
                <!-- Logo Desktop / Логотип десктоп -->
                <img src="../public/images/fe-logo.png" alt="FE ПЛАТФОРМА" class="logo-desktop" />
                <!-- Logo Mobile / Логотип мобильный -->
                <img src="../public/images/small_logo.png" alt="FE ПЛАТФОРМА" class="logo-mobile" />
              ` : `
                <!-- Logo / Логотип (Mobile only) -->
                <img src="../public/images/small_logo.png" alt="FE Платформа" class="logo" />
              `}
              ${backLink ? `
                <!-- Back Button / Кнопка назад -->
                <a href="${backLink}" class="back-link">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>${backText}</span>
                </a>
              ` : ''}
            </div>

            <!-- Account Buttons / Кнопки аккаунта -->
            <div class="account-buttons">
              <!-- Balance Button / Кнопка баланса -->
              <button class="btn">
                <img src="../public/icons/coins.svg" alt="Баланс" class="btn-icon" />
                <span class="btn-text">1 123 ₽</span>
              </button>

              <!-- Profile Button / Кнопка профиля -->
              <button class="btn profile-btn">
                <img src="../public/icons/user.svg" alt="Профиль" class="btn-icon" />
                <span class="btn-text">farbx15@gmail.com</span>
              </button>

              <!-- Mobile Menu Button / Кнопка мобильного меню -->
              <button id="mobile-menu-button" class="btn btn-primary mobile-menu-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Items / Элементы мобильного меню -->
      <div id="mobile-menu-items" class="mobile-menu hidden">
        <!-- Menu Header -->
        <div class="menu-header">
          <img src="../public/images/small_logo.png" alt="FE Платформа" class="logo" />
          <button id="close-menu-button" class="btn btn-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <!-- Menu Content -->
        <div class="menu-content">
          <!-- Services Section -->
          <div class="menu-section">
            <h3 class="menu-title">Услуги</h3>
            <a href="#" class="menu-link">
              <img src="../public/icons/globe.svg" alt="Домены" class="menu-link-icon" />
              <span class="menu-link-text">Домены</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/hosting.svg" alt="Хостинг" class="menu-link-icon" />
              <span class="menu-link-text">Хостинг</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/server.svg" alt="VPS/VDS" class="menu-link-icon" />
              <span class="menu-link-text">VPS/VDS</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/cloud-server.svg" alt="Серверы" class="menu-link-icon" />
              <span class="menu-link-text">Серверы</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/more.svg" alt="Другие услуги" class="menu-link-icon" />
              <span class="menu-link-text">Другие услуги</span>
            </a>
          </div>

          <!-- Additional Section -->
          <div class="menu-section">
            <h3 class="menu-title">Дополнительно</h3>
            <a href="#" class="menu-link">
              <img src="../public/icons/user-business.svg" alt="Партнерство" class="menu-link-icon" />
              <span class="menu-link-text">Партнерство</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/customer-support.svg" alt="Поддержка" class="menu-link-icon" />
              <span class="menu-link-text">Поддержка</span>
            </a>
          </div>

          <!-- Profile Section -->
          <div class="menu-section">
            <h3 class="menu-title">Профиль</h3>
            <a href="#" class="menu-link">
              <img src="../public/icons/user-02.svg" alt="Общая информация" class="menu-link-icon" />
              <span class="menu-link-text">Общая информация</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/coins.svg" alt="Управление счетом" class="menu-link-icon" />
              <span class="menu-link-text">Управление счетом</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/brochure.svg" alt="Документы и акты" class="menu-link-icon" />
              <span class="menu-link-text">Документы и акты</span>
            </a>
            <a href="#" class="menu-link">
              <img src="../public/icons/settings-01.svg" alt="Настройки" class="menu-link-icon" />
              <span class="menu-link-text">Настройки</span>
            </a>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="logout-container">
          <button class="logout-btn">
            <span class="logout-text">Выйти</span>
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

customElements.define("fe-header", FeHeader);
