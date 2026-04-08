# Duolingo Clone (Expo + React Native)

A Duolingo-inspired mobile app built with Expo, React Native, Expo Router, Uniwind, Reanimated, and SVG-based custom UI components.

## Tech Stack

- Expo + React Native
- Expo Router (file-based navigation)
- TypeScript
- Uniwind (Tailwind-style utility classes)
- React Native Reanimated
- `@legendapp/list` for performant lists
- `react-native-svg` + SVG transformer for custom icons

## Project Structure

- `src/app` - Expo Router route files
- `src/screens` - screen-level UI and logic
- `src/components` - shared/reusable components
- `src/data` - local mocked app data
- `src/constants` - icons, colors, and static constants
- `assets` - images, SVGs, and animation assets

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start Metro

```bash
npx expo start
```

### 3) Run on iOS Simulator (dev build)

```bash
npx expo run:ios
```

### 4) Run on Android Emulator (dev build)

```bash
npx expo run:android
```

## Common Commands

- `npx expo start` - start Metro bundler
- `npx expo run:ios` - build and run iOS app
- `npx expo run:android` - build and run Android app

## Notes

- This project uses custom SVG assets heavily, including tab icons, lesson icons, and reward/medal icons.
- UI behavior for lesson lists and popups is data-driven from `src/data/list-items.ts`.
- Some screens are still mock-first and evolve rapidly during UI iteration.

## Demo

[Demo Video](https://github.com/user-attachments/assets/5b4c3578-6f0c-4722-833f-722cb7078573)
