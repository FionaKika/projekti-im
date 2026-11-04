This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Project context: Pricely

Pricely is a mobile app for comparing everyday product prices by store so shoppers can find lower prices nearby. The first rollout is focused on a small product catalog and local shops in Kosovo. The interface uses Albanian and prices use euros.

### Shopper and contributor flows

- Shoppers search by product name, category, or barcode; compare store prices, distance, and when each price was reported; and save products or shopping lists.
- Barcode scanning uses the phone camera. A price contribution includes the product, store, price, a photo of the shelf label, and foreground GPS coordinates.
- Request camera and location access only when the person starts a feature that needs it. Do not collect background location.
- Basic product search and price comparison stay free. Optional alerts and advanced lists can be considered later.

### Data and trust

- Supabase is the planned backend for products, stores, price reports, accounts, and private evidence photos.
- Public clients use only a publishable key. Never include Supabase secret or `service_role` keys in the app or Git. Keep `.env` ignored.
- Community price reports start as `pending`; only reviewed, approved reports should be treated as public prices. Clearly label sample prices and shops as demo data.
- Admin review and price statistics are later features. Do not claim that demo shops, prices, maps, or savings reflect current real-world offers.

### Current project stage

The app currently has a demo catalog, product search and comparison, saved products, barcode scanning, and a price-report form that can upload a private photo and create a pending Supabase row once configured. Authentication, persistent favorites, live approved-price queries, and a real store map remain future work. Update this summary when the project scope changes.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
