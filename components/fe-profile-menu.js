/**
 * FE Profile Menu Web Component
 * Боковое меню для страниц профиля с различными разделами
 *
 * Использование:
 * <fe-profile-menu active="about" show-alert></fe-profile-menu>
 *
 * Атрибуты:
 * - active: активный раздел ('about', 'wallet', 'documents', 'settings')
 * - show-alert: показать красную иконку alert на пункте "Настройки" (опционально)
 */

class FeProfileMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  static get observedAttributes() {
    return ["active", "show-alert"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const activeSection = this.getAttribute("active") || "about";
    const showAlert = this.hasAttribute("show-alert");

    this.shadowRoot.innerHTML = `
      <style>
        /* Используем CSS переменные из :root в input.css */
        :host {
          display: block;
          position: sticky;
          top: 0;
        }

        /* Container / Контейнер */
        .menu-container {
          background: var(--color-base-surface-2);
          border: 1px solid var(--color-base-border);
          border-radius: 24px;
          padding: 12px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Menu sections / Секции меню */
        .menu-section {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Menu Item / Элемент меню */
        .menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 8px;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          text-decoration: none;
          color: inherit;
        }

        .menu-item:hover {
          background: var(--color-base-fill-1);
        }

        /* Menu Item Text / Текст элемента меню */
        .menu-item-text {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: var(--color-text-dark-secondary);
          white-space: nowrap;
        }

        .menu-item.active .menu-item-text {
          color: var(--color-text-dark-primary);
        }

        /* Menu Item Right / Правая часть элемента меню */
        .menu-item-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .menu-item-icon {
          width: 24px;
          height: 24px;
          color: var(--color-text-dark-secondary);
        }

        /* Logout / Выход */
        .menu-logout {
          border-top: none;
          margin-top: 0;
        }
      </style>

      <div class="menu-container">
        <!-- Main Menu Section / Основное меню -->
        <div class="menu-section">
          <a href="./individual.html" class="menu-item ${
            activeSection === "about" ? "active" : ""
          }" data-section="about">
            <span class="menu-item-text">Общая информация</span>
            <div class="menu-item-right"></div>
          </a>

          <a href="./wallet.html" class="menu-item ${
            activeSection === "wallet" ? "active" : ""
          }" data-section="wallet">
            <span class="menu-item-text">Управление счетом</span>
            <div class="menu-item-right"></div>
          </a>

          <a href="./documents.html" class="menu-item ${
            activeSection === "documents" ? "active" : ""
          }" data-section="documents">
            <span class="menu-item-text">Документы и акты</span>
            <div class="menu-item-right"></div>
          </a>

          <a href="./settings.html" class="menu-item ${
            activeSection === "settings" ? "active" : ""
          }" data-section="settings">
            <span class="menu-item-text">Настройки</span>
            <div class="menu-item-right">
              ${
                showAlert
                  ? `<svg width="24" height="24" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-item-icon">
                <path d="M8.23339 1.47482C9.5987 -0.557108 12.6378 -0.489447 13.8916 1.67794L21.5361 14.8957L21.6494 15.1076C22.7302 17.3081 21.18 20 18.6445 20.0002H3.35351C0.736082 20 -0.831049 17.1311 0.461908 14.8957L8.10644 1.67794L8.23339 1.47482ZM12.1602 2.6799C11.6688 1.8304 10.5179 1.77715 9.94433 2.52072L9.83788 2.6799L2.19238 15.8977C1.6419 16.8501 2.33449 18 3.35351 18.0002H18.6445C19.5998 18 20.2683 16.9894 19.8945 16.0783L19.8057 15.8977L12.1602 2.6799ZM11.0078 13.0002L11.1103 13.0051C11.6146 13.0563 12.0078 13.4825 12.0078 14.0002C12.0078 14.5179 11.6146 14.9441 11.1103 14.9953L11.0078 15.0002H10.999C10.4467 15.0002 9.99902 14.5525 9.99902 14.0002C9.99902 13.4479 10.4467 13.0002 10.999 13.0002H11.0078ZM9.99902 11.0002V7.00021C9.99902 6.44792 10.4467 6.00021 10.999 6.00021C11.5513 6.00021 11.999 6.44792 11.999 7.00021V11.0002C11.999 11.5525 11.5513 12.0002 10.999 12.0002C10.4467 12.0002 9.99902 11.5525 9.99902 11.0002Z" fill="#cb1a41"/>
              </svg>`
                  : ""
              }
            </div>
          </a>
        </div>

        <!-- Logout Section / Секция выхода -->
        <div class="menu-logout">
          <a href="#" class="menu-item" data-section="logout" id="logout-btn">
            <span class="menu-item-text">Выход из аккаунта</span>
            <div class="menu-item-right">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="menu-item-icon">
                <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 12H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const logoutBtn = this.shadowRoot.getElementById("logout-btn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Dispatch custom event
        this.dispatchEvent(
          new CustomEvent("profile-logout", {
            bubbles: true,
            composed: true,
          })
        );

        // Optional: Redirect to login page
        // window.location.href = '/login.html';
        console.log("Logout clicked");
      });
    }
  }
}

// Register custom element
customElements.define("fe-profile-menu", FeProfileMenu);
