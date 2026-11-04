# Pricely · Projektstatus

## Çka punon në prototip

- Kryefaqja dhe katalogu lexojnë produktet nga tabela `products` në Supabase (M1).
- Çmimet e miratuara lexohen nga `price_reports`; raportimet e reja nuk shfaqen si oferta para miratimit.
- Kërkimi sipas emrit, markës, barkodit dhe kategorisë përdor katalogun nga Supabase.
- Skaneri i barkodit me kamerën e telefonit kërkon produktin në katalogun nga Supabase.
- Produktet e ruajtura në gjendjen e sesionit.
- Krahasimi i çmimeve të miratuara sipas dyqanit dhe kohës së raportimit.
- Formulari për raportim ngarkon foton e etiketës në bucket-in privat dhe ruan çmimin, dyqanin dhe GPS në Supabase.
- Skema SQL me produkte publike për lexim dhe raportime që qëndrojnë `pending` derisa të miratohen.
- Aplikacioni është konfiguruar lokalisht me `.env`; çelësi nuk është pjesë e Git.

## Gjendja e misioneve J5

- M0: `AGENTS.md` përshkruan idenë Pricely.
- M1: kodi lexon produktet dhe çmimet e miratuara nga Supabase; verifikimi përfundimtar bëhet në telefon.
- M2: formulari dhe politikat e Supabase janë gati. Ende duhet dërguar një raport nga telefoni dhe të shihet rreshti në tabelën `price_reports`.
- M3: harta me të dhëna reale nuk është përfunduar.

## Çka bëri agjenti

- Zëvendësoi përmbajtjen fillestare të artikujve me Pricely dhe krijoi navigimin e aplikacionit.
- Shtoi përmbledhjen e idesë dhe rregullat e të dhënave të Pricely në `AGENTS.md` (M0).
- Shtoi ekranet kryesore: Kryefaqja, Kërko, Skano, Të ruajtura, Profili, krahasimi i produktit dhe raportimi i çmimit.
- Shtoi konfigurimin Expo për kamerën dhe GPS dhe klientin Supabase me variabla publike.
- Lidhi katalogun, kërkimin, skanerin dhe krahasimin me leximet nga Supabase.
- Ekzekutoi `supabase/setup.sql` në projektin Supabase dhe ruajti lidhjen vetëm në `.env` të përjashtuar nga Git.
- Përgatiti raportimin që ngarkon foton dhe fut rreshtin me status `pending`.

## Hapat e radhës

1. Në telefon, skano QR-në e Expo Go që shfaqet në VS Code/terminal (telefoni dhe kompjuteri të jenë në të njëjtin Wi-Fi).
2. Hape produktin `Shampo hidratues`, shto çmimin, emrin e dyqanit, fotografo etiketën dhe shto vendndodhjen GPS.
3. Dërgo raportimin; kontrollo që u shfaq në Supabase te tabela `price_reports` me `status = pending`.
4. Bëj screenshot nga telefoni për dorëzim. Pa këtë rresht dhe screenshot, check-off-i në klasë mbetet për t'u verifikuar.
5. Më pas mund të shtohen Supabase Auth, miratimi për administratorët dhe harta me dyqane reale.

## Kolonat kryesore për shpjegimin në klasë

- `product_id`: cilit produkt i përket raportimi.
- `store_name`: dyqani ku u pa çmimi.
- `price`: çmimi i raportuar në euro.
- `latitude` dhe `longitude`: koordinatat e dyqanit nga GPS.
- `evidence_path`: rruga e fotos së etiketës në bucket-in privat.
- `status`: `pending` derisa raportimi të kontrollohet.

## Draft për dorëzimin J5

M0 është dokumentuar. M1 është lidhur me Supabase: aplikacioni lexon katalogun dhe çmimet e miratuara. M2 është gati për demonstrim: përdoruesi raporton çmimin nga telefoni, bashkëngjit fotografinë e etiketës dhe GPS-in, dhe rreshti ruhet si `pending`. Për ta shënuar M2 të arritur duhen dërguar raportimi nga telefoni, parë rreshti në Supabase dhe bashkëngjitur screenshot-i.

Produkteve fillestare iu shtuan të dhëna seed për demonstrim; çmime reale nuk ka derisa përdoruesit të dërgojnë raportime dhe administratori t'i miratojë.
