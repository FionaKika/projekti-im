# Pricely

Pricely helps shoppers compare everyday product prices by store and contribute recent, verifiable prices from their phones.

## Run the app

```bash
npm install
npx expo start
```

Camera scanning and GPS use Expo Camera and Expo Location for SDK 57. Test these device features on a physical phone or a development build.

## Connect Supabase

1. Copy `.env.example` to `.env` and add the project URL and **publishable** key from Supabase.
2. Run `supabase/setup.sql` in the Supabase SQL Editor.
3. Restart Expo with `npx expo start --clear`.

Never put a Supabase secret or `service_role` key in the mobile app. Public price submissions stay pending until an administrator approves them. The sample prices and shops in this prototype are not real offers.
