# FE.ru - Платформа аренды серверов, хостингов и доменов

Статичный HTML-проект с высоким требованием к качеству верстки и адаптивности.

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Сборка CSS

Для разработки (с автоматической пересборкой):
```bash
npm run build-css
```

Для продакшена (минифицированная версия):
```bash
npm run build-css-prod
```

### 3. Открытие страниц

После сборки CSS просто открывайте любой `.html` файл в браузере.

## Структура проекта

```
/
├── public/                    # Статические ресурсы
│   ├── images/               # Изображения
│   └── icons/                # Иконки
├── components/               # Web Components
│   ├── fe-header.js         # Основной хедер
│   ├── fe-header-partnership.js  # Хедер для партнерского дашборда
│   ├── fe-modal.js          # Боковая модалка
│   ├── fe-center-modal.js   # Центральная модалка
│   ├── fe-promo-modal.js    # Модалка для промокода
│   ├── fe-profile-menu.js   # Меню профиля
│   └── sidebar-partnership.html  # Боковое меню партнерского дашборда
├── PartnershipDashboard/     # Страницы партнерского дашборда
│   ├── index.html
│   ├── client-list.html
│   ├── promocodes.html
│   ├── statistics.html
│   ├── news.html
│   ├── edit-news.html
│   ├── pages.html
│   ├── site-settings.html
│   ├── email-templates.html
│   ├── domain-pricing.html
│   ├── hosting-pricing.html
│   └── server-pricing.html
├── Domains/                  # Страницы доменов
│   └── index.html
├── Servers/                  # Страницы серверов
│   └── index.html
├── input.css                 # Входной файл Tailwind CSS + CSS переменные
├── styles.css                # Выходной файл (генерируется автоматически)
├── tailwind.config.js        # Конфигурация Tailwind CSS
├── package.json
├── CLAUDE.md                 # Инструкции для Claude Code
└── README.md                 # Этот файл
```

## Управление дизайн-системой

### Изменение цветов темы

Все цвета проекта централизованно управляются через CSS-переменные в файле `input.css`.

**Чтобы изменить тему:**
1. Открой `input.css`
2. Найди секцию `:root { ... }`
3. Измени нужные переменные
4. Запусти `npm run build-css`

Пример:
```css
:root {
  /* Base Colors */
  --color-base-surface-1: #ffffff;
  --color-base-surface-2: #fafaf9;
  --color-base-fill-1: #f5f5f4;
  --color-base-border: #e7e5e4;

  /* Text Colors */
  --color-text-dark-primary: #1a1a1a;
  --color-text-dark-secondary: #1a1a1ab2;

  /* State Brand Colors */
  --color-state-brand-hover: #f67416;
  --color-state-brand-active: #e4570c;

  /* ... и так далее */
}
```

Все веб-компоненты автоматически используют эти переменные, поэтому изменения применятся ко всему проекту сразу.

## Технологии

- **HTML** - структура страниц
- **Tailwind CSS** - основной фреймворк стилизации
- **CSS Custom Properties (Variables)** - централизованная система цветов
- **Vanilla JavaScript** - интерактивность
- **Grid.js** - библиотека для таблиц
- **Web Components** - переиспользуемые компоненты с Shadow DOM

## Разработка

### Адаптивность

Все страницы должны корректно отображаться на:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

Используется подход:
- Desktop: `hidden md:block`
- Mobile: `block md:hidden`

### Работа с таблицами

На мобильных устройствах таблицы преобразуются в карточки для лучшей читаемости. Каждая страница с таблицей имеет две версии рендеринга:
- Desktop: полная таблица с Grid.js
- Mobile: карточный layout с ключевыми данными

### Добавление новых цветов

1. Добавь новую CSS-переменную в `input.css` в секцию `:root`
2. Используй её в компонентах через `var(--твоя-переменная)`
3. Запусти `npm run build-css`

### Работа с Web Components

Все компоненты в `/components` используют Shadow DOM и CSS-переменные из `input.css`. Чтобы изменить стили компонента:

1. Открой `.js` файл компонента
2. Найди секцию `<style>` внутри `shadowRoot.innerHTML`
3. Используй CSS-переменные: `var(--color-base-surface-1)`
4. Не используй хардкод цветов

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm install` | Установка зависимостей |
| `npm run build-css` | Сборка CSS с автоматической пересборкой (для разработки) |
| `npm run build-css-prod` | Минифицированная сборка CSS (для продакшена) |

## Особенности проекта

- Pixel-perfect верстка по Figma
- Централизованная система цветов через CSS-переменные
- Полная адаптивность под все устройства
- Статичные HTML-страницы без фреймворков
- Переиспользуемые Web Components
- Таблицы с адаптацией под мобильные устройства

## Дополнительная информация

Для подробных инструкций по работе с Claude Code смотри [CLAUDE.md](./CLAUDE.md).
