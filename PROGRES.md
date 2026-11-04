# Pricely · Projektstatus

## Çka punon në prototip

- Kryefaqja me kërkim, kategori, produkte dhe krahasime demonstrative për dyqane në Prishtinë.
- Kërkimi sipas emrit, markës, barkodit dhe kategorisë.
- Skaneri i barkodit me kamerën e telefonit; barkodet e katalogut hapin krahasimin e produktit.
- Produktet e ruajtura në gjendjen e sesionit.
- Krahasimi i çmimeve sipas dyqanit, distancës dhe kohës së raportimit.
- Formulari për raportim çmimi me foto prove, GPS dhe ngarkim në Supabase kur konfigurohet.
- Skema SQL me produkte publike për lexim dhe raportime që qëndrojnë `pending` derisa të miratohen.

## Çka bëri agjenti

- Zëvendësoi përmbajtjen fillestare të artikujve me Pricely dhe krijoi navigimin e aplikacionit.
- Shtoi ekranet kryesore: Kryefaqja, Kërko, Skano, Të ruajtura, Profili, krahasimi i produktit dhe raportimi i çmimit.
- Shtoi konfigurimin Expo për kamerën dhe GPS dhe klientin Supabase me variabla publike.
- Përjashtoi `.env` nga Git dhe përgatiti `supabase/setup.sql`.

## Hapat e radhës

1. Kopjo `.env.example` si `.env` dhe vendos URL-në e Supabase dhe publishable key.
2. Ekzekuto `supabase/setup.sql` në Supabase SQL Editor.
3. Hap aplikacionin në telefon, provo barkodet e mostrës dhe dërgo një raportim.
4. Shto Supabase Auth, ruajtje të preferencave, miratim për administratorët dhe hartë me dyqane reale.

## Kolonat kryesore për shpjegimin në klasë

- `product_id`: cilit produkt i përket raportimi.
- `store_name`: dyqani ku u pa çmimi.
- `price`: çmimi i raportuar në euro.
- `latitude` dhe `longitude`: koordinatat e dyqanit nga GPS.
- `evidence_path`: rruga e fotos së etiketës në bucket-in privat.
- `status`: `pending` derisa raportimi të kontrollohet.

## Draft për dorëzimin J5

Pricely përgatit misionin M2: përdoruesi raporton çmimin e një produkti nga telefoni, bashkëngjit fotografinë e etiketës dhe vendndodhjen GPS. Raportimi ruhet në Supabase si `pending` derisa të verifikohet.

Çmimet dhe dyqanet aktuale janë vetëm të dhëna demonstrative. Nuk duhet të përdoren si oferta reale.
