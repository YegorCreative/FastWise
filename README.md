# FastWise

FastWise is a premium, mobile-first web application designed for tracking intermittent fasting. Built with modern web aesthetics (dark mode, glassmorphism, dynamic animations), the frontend provides a native app-like experience directly in the browser.

Currently implemented in Vanilla HTML, CSS, and JS to allow easy hosting and testing via GitHub Pages, with future plans to migrate to a React-based architecture for iOS deployment.

## Features

- **Mobile-First Design**: Optimized layout restricting desktop views to simulate a mobile frame, scaling perfectly on real mobile devices.
- **Premium UI**: Uses a carefully tailored dark mode with smooth gradients, glassmorphism, and subtle micro-animations.
- **Fasting Timer**: A precise, SVG-based circular progress ring that tracks elapsed fasting time against a customizable goal.
- **Fasting Plans**: Instantly switch between popular fasting protocols:
  - **16:8** (Skip Breakfast)
  - **14:10** (Skip Breakfast)
  - **23:1 (OMAD)** (One Meal A Day - Dinner)
  - **Power Week** (18-hour fast optimized for weight loss)
- **Interactive Logic**: The timer calculates exactly based on `Date.now()`, ensuring accuracy even if the browser tabs sleep.

## Tech Stack

- **HTML5**: Semantic structure designed for a single-page app feel.
- **CSS3**: Vanilla CSS utilizing Custom Properties (Variables), Flexbox, CSS Grid, and advanced styling like backdrop-filter.
- **JavaScript (Vanilla)**: Lightweight DOM manipulation, interval management, and event handling without external dependencies.

## Setup & Testing

No build step is required for the current version! 

1. Clone or download this repository.
2. Open `index.html` directly in your favorite modern web browser.
3. For the best experience on desktop, open Developer Tools (F12 in Chrome/Edge), and toggle the **Device Toolbar** to simulate an iPhone or Android device.

## Roadmap

- [x] Initial Mobile-only HTML/CSS/JS prototype
- [x] Implement Fasting Plans selection
- [ ] Add LocalStorage support to save timer state and history across sessions
- [ ] Migrate the application to a React/Next.js environment
- [ ] Package into a native iOS application using React Native or WebView