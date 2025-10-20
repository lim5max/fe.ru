/**
 * FE Promo Modal Web Component
 * Боковая модалка для ввода промокода
 *
 * Использование:
 * <fe-promo-modal id="promoModal"></fe-promo-modal>
 *
 * API:
 * - open() - открыть модалку
 * - close() - закрыть модалку
 * - События:
 *   - promo-activated: { code: string } - промокод активирован
 */

class FePromoModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --modal-max-width: 480px;
        }

        /* Backdrop / Затемненный фон */
        .modal-backdrop {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(26, 26, 26, 0.18);
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .modal-backdrop.active {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          opacity: 1;
        }

        /* Modal Container / Контейнер модалки */
        .modal-container {
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0px 1.5px 0px 0.5px rgba(26, 26, 26, 0.08),
                      0px 8px 16px -8px rgba(26, 26, 26, 0.08);
          width: var(--modal-max-width);
          height: calc(100vh - 16px);
          position: relative;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          margin: 8px 8px 8px 0;
          overflow: hidden;
        }

        .modal-backdrop.active .modal-container {
          transform: translateX(0);
        }

        /* Close Button / Кнопка закрытия */
        .modal-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          background: #fafaf9;
          border: 1px solid #e7e5e4;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
          z-index: 10;
        }

        .modal-close-btn:hover {
          background: #f5f5f4;
        }

        .modal-close-btn svg {
          width: 20px;
          height: 20px;
        }

        /* Header / Заголовок */
        .modal-header {
          padding: 20px 56px 20px 24px;
          border-bottom: none;
        }

        .modal-title {
          font-family: 'Inter Variable', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 24px;
          line-height: 38px;
          color: #050505;
          margin: 0;
        }

        /* Content / Контент */
        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 8px 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Input Section / Секция ввода */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-label {
          font-family: 'Inter Variable', 'Inter', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          color: rgba(26, 26, 26, 0.7);
        }

        .input-field {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 18px;
          height: 56px;
          padding: 0 20px;
          font-family: 'Inter Variable', 'Inter', sans-serif;
          font-weight: 500;
          font-size: 18px;
          line-height: 28px;
          color: rgba(26, 26, 26, 0.7);
          transition: border-color 0.2s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #e4570c;
        }

        .input-field::placeholder {
          color: rgba(26, 26, 26, 0.4);
        }

        /* Activate Button / Кнопка активации */
        .activate-btn {
          background: #e4570c;
          border: 1px solid rgba(26, 26, 26, 0.12);
          border-radius: 18px;
          height: 56px;
          padding: 0 24px;
          font-family: 'Inter Variable', 'Inter', sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 32px;
          color: #ffffff;
          cursor: pointer;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .activate-btn:hover {
          background: #f67416;
        }

        .activate-btn:active {
          background: #e4570c;
        }

        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .modal-container {
            width: calc(100vw - 16px);
            height: calc(100vh - 16px);
            margin: 8px 8px 8px 0;
          }

          .modal-header {
            padding: 16px 48px 16px 16px;
          }

          .modal-title {
            font-size: 20px;
            line-height: 32px;
          }

          .modal-content {
            padding: 8px 16px;
          }
        }
      </style>

      <!-- Modal Backdrop / Затемненный фон -->
      <div class="modal-backdrop" id="backdrop">
        <!-- Modal Container / Контейнер модалки -->
        <div class="modal-container" id="modal">
          <!-- Close Button / Кнопка закрытия -->
          <button class="modal-close-btn" id="closeBtn" aria-label="Закрыть">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#56524E" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Header / Заголовок -->
          <div class="modal-header">
            <h2 class="modal-title">Промокод</h2>
          </div>

          <!-- Content / Контент -->
          <div class="modal-content">
            <!-- Input Section / Секция ввода -->
            <div class="input-group">
              <label class="input-label" for="promoInput">Введите код</label>
              <input
                type="text"
                id="promoInput"
                class="input-field"
                placeholder="TestCode2025"
              />
            </div>

            <!-- Activate Button / Кнопка активации -->
            <button class="activate-btn" id="activateBtn">
              Активировать
            </button>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const backdrop = this.shadowRoot.getElementById("backdrop");
    const modal = this.shadowRoot.getElementById("modal");
    const closeBtn = this.shadowRoot.getElementById("closeBtn");
    const activateBtn = this.shadowRoot.getElementById("activateBtn");
    const input = this.shadowRoot.getElementById("promoInput");

    // Закрытие по клику на backdrop
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        this.close();
      }
    });

    // Закрытие по клику на кнопку закрытия
    closeBtn.addEventListener("click", () => {
      this.close();
    });

    // Закрытие по нажатию Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop.classList.contains("active")) {
        this.close();
      }
    });

    // Предотвращение всплытия клика на модалке
    modal.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Активация промокода
    activateBtn.addEventListener("click", () => {
      const promoCode = input.value.trim();
      if (promoCode) {
        // Dispatch custom event
        this.dispatchEvent(
          new CustomEvent("promo-activated", {
            bubbles: true,
            composed: true,
            detail: { code: promoCode },
          })
        );
        this.close();
      }
    });

    // Enter на input
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        activateBtn.click();
      }
    });
  }

  // Public API
  open() {
    const backdrop = this.shadowRoot.getElementById("backdrop");
    const input = this.shadowRoot.getElementById("promoInput");

    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";

    // Фокус на input после анимации
    setTimeout(() => {
      input.focus();
    }, 300);

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent("modal-opened", {
        bubbles: true,
        composed: true,
      })
    );
  }

  close() {
    const backdrop = this.shadowRoot.getElementById("backdrop");
    const input = this.shadowRoot.getElementById("promoInput");

    backdrop.classList.remove("active");
    document.body.style.overflow = "";

    // Очистка input
    input.value = "";

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent("modal-closed", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

// Register custom element
customElements.define("fe-promo-modal", FePromoModal);
