This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Active project: Pricely

Pricely helps shoppers compare everyday product prices by store and find lower prices nearby. The first rollout is a small catalog and local shops in Kosovo. The interface is in Albanian and prices use euros.

Shoppers can search by product name, category, or barcode; compare store prices, distance, and report age; and save products or shopping lists. Contributors can scan a product, enter a store price, photograph the shelf label, and attach foreground GPS coordinates. Ask for camera or location permission only when the user starts a feature that needs it. Do not collect background location.

Basic product search and price comparison stay free. Optional price alerts and advanced shopping lists can be considered later. Admin review and price statistics are later features.

### Data and trust

- Supabase is the planned backend for products, stores, price reports, accounts, and private evidence photos.
- Public app code may use only a Supabase publishable key. Never put secret or `service_role` keys in the app or Git. Keep `.env` ignored.
- Community reports begin as `pending`; only reviewed, approved reports are public prices.
- Clearly label sample products, stores, prices, and savings as demo data. Do not imply they are current offers.

### Project source record

The original `EKIPI.md` and `HARTA.md` in this repository describe an Appointment Organizer for beauty salons. The active app implementation follows the user's later, explicit pivot to Pricely. `BISEDAT.md` contains clearly labeled hypothetical examples requested for formatting; never present them as real interviews or validation. Replace them with real, user-provided research when available.

## Expo has changed — do not trust your training data

Expo ships breaking changes each SDK release. Before writing code that touches an Expo, EAS, or React Native API:

1. Read the major version of `expo` in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`.
3. For Expo topics, read `https://docs.expo.dev/llms.txt` and follow its links to the specific page. Do not rely on remembered APIs.

## Commands

Use `bunx` instead of `npx` if the project uses Bun (`bun.lock` present).

```bash
npx expo install <package>  # Use Expo's compatible package version
npx expo start              # Start the development server
npx expo lint               # Lint
npx tsc --noEmit            # Typecheck
npx expo-doctor             # Diagnose dependency and config issues
npx expo install --fix      # Fix incompatible package versions
```

Run lint and typecheck before declaring a task done. Test device features on a physical phone using Expo Go when they are included there.

## Navigation and routing

- Use Expo Router for all navigation. Routes live in `src/app/`; `_layout.tsx` files define navigators. Keep non-route code outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud and to ship over-the-air updates. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated with Continuous Native Generation. Never create or edit them by hand; configure native behavior in `app.json` and config plugins.
- Expo Go includes only its bundled native modules. If a new library is not included in Expo Go, the app needs a development build (`npx expo run:ios|android` or `eas build --profile development`).
- Prefer recommended Expo modules over third-party libraries, and check available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
- Commit after each working development step and review the diff before committing.
