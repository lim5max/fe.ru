/**
 * FE Modal Web Component
 * Универсальная модалка с гибким содержимым
 *
 * Использование:
 * <fe-modal id="myModal" modal-title="Заголовок">
 *   <div slot="content">
 *     <!-- Произвольный контент модалки -->
 *   </div>
 *   <div slot="footer">
 *     <!-- Опциональный футер с кнопками -->
 *   </div>
 * </fe-modal>
 *
 * API:
 * - open() - открыть модалку
 * - close() - закрыть модалку
 * - Атрибуты:
 *   - modal-title: заголовок модалки
 *   - max-width: максимальная ширина (по умолчанию 464px)
 *   - max-height: максимальная высота (по умолчанию 90vh)
 */

class FeModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const modalTitle = this.getAttribute("modal-title") || "Модальное окно";
    const maxWidth = this.getAttribute("max-width") || "464px";
    const maxHeight = this.getAttribute("max-height") || "90vh";

    this.shadowRoot.innerHTML = `
      <style>
        /* Используем CSS переменные из :root в input.css */
        :host {
          --modal-max-width: ${maxWidth};
          --modal-max-height: ${maxHeight};
        }

        /* Backdrop / Затемненный фон */
        .modal-backdrop {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-alpha-dark-200);
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
          background: var(--color-base-surface-1);
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
          background: var(--color-base-surface-2);
          border: 1px solid var(--color-base-border);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
          z-index: 10;
        }

        .modal-close-btn:hover {
          background: var(--color-base-fill-1);
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
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 24px;
          line-height: 38px;
          color: var(--color-text-dark-primary);
          margin: 0;
        }

        /* Content / Контент */
        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }

        /* Footer / Футер */
        .modal-footer {
          border-top: 1px solid var(--color-base-border);
          padding: 24px;
        }

        .modal-footer:empty {
          display: none;
          border-top: none;
          padding: 0;
        }

        /* Scrollbar styling */
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: var(--color-base-fill-3);
          border-radius: 3px;
        }

        .modal-content::-webkit-scrollbar-thumb:hover {
          background: var(--color-base-fill-4);
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

          .modal-footer {
            padding: 16px;
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
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Header / Заголовок -->
          <div class="modal-header">
            <h2 class="modal-title">${modalTitle}</h2>
          </div>

          <!-- Content / Контент -->
          <div class="modal-content">
            <slot name="content"></slot>
          </div>

          <!-- Footer / Футер -->
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const backdrop = this.shadowRoot.getElementById("backdrop");
    const modal = this.shadowRoot.getElementById("modal");
    const closeBtn = this.shadowRoot.getElementById("closeBtn");

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
  }

  // Public API
  open() {
    const backdrop = this.shadowRoot.getElementById("backdrop");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";

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
    backdrop.classList.remove("active");
    document.body.style.overflow = "";

    // Dispatch custom event
    this.dispatchEvent(
      new CustomEvent("modal-closed", {
        bubbles: true,
        composed: true,
      })
    );
  }

  // Update title dynamically
  setTitle(newTitle) {
    const titleElement = this.shadowRoot.querySelector(".modal-title");
    if (titleElement) {
      titleElement.textContent = newTitle;
    }
  }
}

// Register custom element
customElements.define("fe-modal", FeModal);
