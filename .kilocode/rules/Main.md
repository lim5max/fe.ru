# Main.md

Main rule for every prompt.

## Guidelines

This file provides guidance when working with code in this repository.

## Project Overview

Разработка и верстка HTML страниц для платформы fe.ru, специализирующейся на аренде серверов, покупке хостингов и доменов. Проект представляет собой набор статичных HTML-страниц с высоким требованием к качеству верстки и адаптивности.

## Technology Stack

- **HTML**: Основа для структуры всех страниц
- **CSS**: Глобальные стили и кастомные решения, не покрываемые Tailwind CSS
- **Tailwind CSS**: Основной фреймворк стилизации с переменными из Figma для pixel-perfect соответствия
- **JavaScript (Vanilla JS)**: Интерактивность на стороне клиента
- **Tabulator.js**: Библиотека для сложных, интерактивных и адаптивных таблиц

## Build Commands

Generate CSS from Tailwind:

```bash
npx tailwindcss -i ./input.css -o ./styles.css --watch
```

No build process required - open any `.html` file directly in a browser.

## Architecture

### File Structure

```
/
├── public/
│   ├── images/
│   └── logo.svg
├── components/
│   ├── menu.html
│   ├── table-vps.html
│   └── card-hosting.html
├── Hosting/
│   └── index.html
├── VPS/
│   └── index.html
├── styles.css
└── tailwind.config.js
```

- `public/`: Static assets (images, icons, fonts)
- `components/`: Reusable UI component templates - **IMPORTANT**: Copy code from these files and paste directly into HTML pages. No imports, builds, or JS frameworks for component inclusion.
- `/Hosting`, `/VPS/`: Section-based page directories

## Component Architecture

Components are HTML template files that should be copied and pasted directly into pages. No dynamic import system is used - this is a static HTML project.

## Design Requirements

### Responsive Design

- **Pixel Perfect**: Match Figma designs exactly
- **Tailwind-first**: Use utility classes and variables from `tailwind.config.js`
- **Full responsive**: Support mobile, tablet, desktop
- **Global styles**: Use `styles.css` for body, headers, Tabulator plugin styles, and complex components that can't be achieved with Tailwind alone

### Tables with Tabulator.js

Tables are a key interface element requiring special attention:

- **Desktop**: Show all necessary data columns
- **Mobile**: Transform tables for small screens - keep 2-3 key columns (e.g., "Name", "Price", "Action"), integrate data from hidden columns into visible cells or show on click instead of horizontal scrolling

## Implementation Guidelines

- Generate complete, working code that implements the intended solution
- Focus on direct implementation without unnecessary explanations
- Handle edge cases and production-ready error handling
- Validate all inputs comprehensively
- Avoid TODO items and incomplete solutions

### HTML Structure Guidelines

- Разделяй основные блоки и части HTML структуры комментариями для удобства чтения кода
- Используй четкие, описательные комментарии на русском языке для обозначения секций
- Пример структуры комментариев:

  ```html
  <!-- Header / Шапка сайта -->
  <header>...</header>

  <!-- Main Navigation / Основная навигация -->
  <nav>...</nav>

  <!-- Hero Section / Главный баннер -->
  <section>...</section>

  <!-- Content Section / Основной контент -->
  <main>...</main>

  <!-- Footer / Подвал сайта -->
  <footer>...</footer>
  ```
