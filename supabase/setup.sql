-- Pricely schema for public product comparisons and moderated community reports.
-- Run in the Supabase SQL Editor. The app only uses a publishable key.

create table if not exists public.products (
  id text primary key,
  barcode text not null unique,
  name text not null,
  brand text not null,
  category text not null,
  amount text not null
);

insert into public.products (id, barcode, name, brand, category, amount)
values
  ('shampoo', '3830001234567', 'Shampo hidratues', 'Nature Care', 'Kujdes personal', '400 ml'),
  ('milk', '3830009876543', 'Qumësht i freskët', 'Drena', 'Bulmet', '1 L'),
  ('coffee', '3830004567890', 'Kafe e bluar', 'Buna', 'Ushqime', '200 g'),
  ('olive-oil', '3830004567123', 'Vaj ulliri ekstra', 'Olivia', 'Ushqime', '1 L'),
  ('detergent', '3830006789012', 'Detergjent rrobash', 'Clean Day', 'Shtëpi', '2 L'),
  ('pasta', '3830006789456', 'Makarona penne', 'Mamma Mia', 'Ushqime', '500 g')
on conflict (id) do update set
  barcode = excluded.barcode,
  name = excluded.name,
  brand = excluded.brand,
  category = excluded.category,
  amount = excluded.amount;

create table if not exists public.price_reports (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id),
  store_name text not null check (char_length(store_name) between 2 and 100),
  price numeric(10, 2) not null check (price > 0 and price < 100000),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  evidence_path text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists price_reports_product_status_idx
  on public.price_reports (product_id, status, created_at desc);

alter table public.products enable row level security;
alter table public.price_reports enable row level security;

drop policy if exists "Public can read Pricely products" on public.products;
create policy "Public can read Pricely products"
  on public.products for select to anon using (true);

drop policy if exists "Public can read approved price reports" on public.price_reports;
create policy "Public can read approved price reports"
  on public.price_reports for select to anon using (status = 'approved');

drop policy if exists "Public can submit pending price reports" on public.price_reports;
create policy "Public can submit pending price reports"
  on public.price_reports for insert to anon
  with check (status = 'pending');

grant select on public.products to anon;
grant select, insert on public.price_reports to anon;
revoke update, delete on public.products, public.price_reports from anon;

-- Evidence stays private. Anonymous clients may upload to the pending folder,
-- but cannot list, download, change, or delete submitted photos.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('price-evidence', 'price-evidence', false, 5242880, array['image/jpeg'])
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg'];

drop policy if exists "Submit Pricely price evidence" on storage.objects;
create policy "Submit Pricely price evidence"
  on storage.objects for insert to anon
  with check (
    bucket_id = 'price-evidence'
    and (storage.foldername(name))[1] = 'pending'
    and lower(storage.extension(name)) = 'jpg'
  );

grant usage on schema public to anon;
grant usage on schema storage to anon;
grant insert on storage.objects to anon;
