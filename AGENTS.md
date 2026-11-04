Ky është një aplikacion celular Expo/React Native. Jep përparësi zgjidhjeve të përshtatshme për telefonat, performancës dhe përputhshmërisë ndërmjet platformave.

Pricely
- Raportimet e komunitetit fillojnë me statusin `pending` (në pritje); vetëm raportimet e shqyrtuara dhe të miratuara shfaqen si çmime publike.
- Shëno qartë si të dhëna demonstrimi produktet, dyqanet, çmimet dhe kursimet shembull. Mos lë të kuptohet se janë oferta aktuale.

### Burimi i projektit

Skedarët origjinalë `EKIPI.md` dhe `HARTA.md` në këtë depo përshkruajnë një organizues takimesh për sallone bukurie. Zbatimi aktiv i aplikacionit ndjek kalimin e mëvonshëm dhe të qartë të përdoruesit te Pricely. `BISEDAT.md` përmban shembuj hipotetikë të shënuar qartë, të kërkuar për formatim; mos i paraqit kurrë si intervista reale ose si vërtetim të idesë. Zëvendësoji me kërkime reale të dhëna nga përdoruesi kur të jenë në dispozicion.

## Expo ndryshon — mos u mbështet te njohuritë e vjetruara

Çdo version i SDK-së mund të sjellë ndryshime të papajtueshme në Expo. Para se të shkruash kod që përdor një API të Expo, EAS ose React Native:

1. Kontrollo versionin kryesor të `expo` në `package.json`.
2. Hap dokumentacionin e versionuar përkatës: `https://docs.expo.dev/versions/v<major>.0.0/`.
3. Për temat e Expo-s, lexo `https://docs.expo.dev/llms.txt` dhe ndiq lidhjet drejt faqes përkatëse. Mos u mbështet te API-të që mban mend.

## Komandat

Përdor `bunx` në vend të `npx` nëse projekti përdor Bun (nëse ekziston skedari `bun.lock`).

```bash
npx expo install <package>  # Instalimi i versionit të paketës që përputhet me Expo-n
npx expo start              # Nisja e serverit të zhvillimit
npx expo lint               # Kontrolli i stilit dhe gabimeve të kodit
npx tsc --noEmit            # Kontrolli i tipeve
npx expo-doctor             # Diagnostikimi i varësive dhe konfigurimit
npx expo install --fix      # Rregullimi i versioneve të papajtueshme të paketave
```

Kryej lint dhe kontrollin e tipeve para se ta quash detyrën të përfunduar. Veçoritë që varen nga pajisja provoji në një telefon fizik me Expo Go, kur përfshihen në Expo Go.

## Navigimi dhe rrugët

- Përdor Expo Router për të gjithë navigimin. Rrugët ndodhen te `src/app/`; skedarët `_layout.tsx` përcaktojnë navigatorët. Mbaje kodin që nuk përfaqëson rrugë jashtë `src/app/`.
- Importo `Link`, `router` dhe `useLocalSearchParams` nga `expo-router`.
- Dokumentacioni: `https://docs.expo.dev/router/introduction.md`

## Ndërtimi me EAS

Përdor EAS për ta ndërtuar, nënshkruar dhe dërguar aplikacionin në cloud, si dhe për të publikuar përditësime OTA. Në projektet Bun, ekzekuto EAS CLI me `bunx eas-cli <command>`; në të tjerat, përdor `npx eas-cli@latest <command>`.

Dokumentacioni: `https://docs.expo.dev/eas/index.md`

## Rregullat

- Nëse drejtoritë `ios/` dhe `android/` nuk ekzistojnë, ato krijohen me Continuous Native Generation. Mos i krijo ose modifiko manualisht; konfiguro sjelljen native te `app.json` dhe te config plugins.
- Expo Go përfshin vetëm modulet native të paketuara me të. Nëse një bibliotekë e re nuk përfshihet në Expo Go, aplikacioni ka nevojë për një development build (`npx expo run:ios|android` ose `eas build --profile development`).
- Jep përparësi moduleve të rekomanduara nga Expo dhe kontrollo aftësitë ekzistuese para se të shtosh varësi. Dokumentacioni: `https://docs.expo.dev/versions/latest/index.md`.
- Pas çdo hapi funksional të zhvillimit, shqyrto ndryshimet dhe krijo një commit.
