export type StorePrice = { store: string; area: string; price: number; distanceKm?: number; updated: string; latitude?: number; longitude?: number };
export type Product = {
  id: string; barcode: string; name: string; brand: string; category: string;
  amount: string; emoji: string; color: string; prices: StorePrice[];
};

export const demoProducts: Product[] = [
  { id: 'shampoo', barcode: '3830001234567', name: 'Shampo hidratues', brand: 'Nature Care', category: 'Kujdes personal', amount: '400 ml', emoji: '🧴', color: '#E5EBF5', prices: [
    { store: 'Viva Fresh', area: 'Ulpianë', price: 3.49, distanceKm: 0.8, updated: 'sot, 10:24' }, { store: 'Interex', area: 'Qendër', price: 3.89, distanceKm: 1.4, updated: 'dje, 17:40' }, { store: 'ETC', area: 'Dardani', price: 4.29, distanceKm: 2.1, updated: 'dje, 12:15' },
  ] },
  { id: 'milk', barcode: '3830009876543', name: 'Qumësht i freskët', brand: 'Drena', category: 'Bulmet', amount: '1 L', emoji: '🥛', color: '#E6F1F3', prices: [
    { store: 'Interex', area: 'Qendër', price: 1.09, distanceKm: 1.4, updated: 'sot, 09:12' }, { store: 'Viva Fresh', area: 'Ulpianë', price: 1.15, distanceKm: 0.8, updated: 'dje, 19:05' }, { store: 'Meridian', area: 'Bregu i Diellit', price: 1.29, distanceKm: 2.8, updated: 'dje, 15:32' },
  ] },
  { id: 'coffee', barcode: '3830004567890', name: 'Kafe e bluar', brand: 'Buna', category: 'Ushqime', amount: '200 g', emoji: '☕', color: '#F3E8DC', prices: [
    { store: 'ETC', area: 'Dardani', price: 2.79, distanceKm: 2.1, updated: 'sot, 08:50' }, { store: 'Meridian', area: 'Bregu i Diellit', price: 3.09, distanceKm: 2.8, updated: 'dje, 16:18' }, { store: 'Viva Fresh', area: 'Ulpianë', price: 3.25, distanceKm: 0.8, updated: 'dje, 13:42' },
  ] },
  { id: 'olive-oil', barcode: '3830004567123', name: 'Vaj ulliri ekstra', brand: 'Olivia', category: 'Ushqime', amount: '1 L', emoji: '🫒', color: '#EEF0D9', prices: [
    { store: 'Viva Fresh', area: 'Ulpianë', price: 7.49, distanceKm: 0.8, updated: 'sot, 08:10' }, { store: 'Interex', area: 'Qendër', price: 8.15, distanceKm: 1.4, updated: 'dje, 14:20' }, { store: 'ETC', area: 'Dardani', price: 8.79, distanceKm: 2.1, updated: 'para 2 ditësh' },
  ] },
  { id: 'detergent', barcode: '3830006789012', name: 'Detergjent rrobash', brand: 'Clean Day', category: 'Shtëpi', amount: '2 L', emoji: '🫧', color: '#DFEAF6', prices: [
    { store: 'Meridian', area: 'Bregu i Diellit', price: 4.99, distanceKm: 2.8, updated: 'sot, 09:48' }, { store: 'Interex', area: 'Qendër', price: 5.49, distanceKm: 1.4, updated: 'dje, 18:24' }, { store: 'Viva Fresh', area: 'Ulpianë', price: 5.89, distanceKm: 0.8, updated: 'dje, 11:05' },
  ] },
  { id: 'pasta', barcode: '3830006789456', name: 'Makarona penne', brand: 'Mamma Mia', category: 'Ushqime', amount: '500 g', emoji: '🍝', color: '#F5EAD7', prices: [
    { store: 'Interex', area: 'Qendër', price: 0.89, distanceKm: 1.4, updated: 'sot, 09:31' }, { store: 'ETC', area: 'Dardani', price: 0.99, distanceKm: 2.1, updated: 'dje, 17:02' }, { store: 'Viva Fresh', area: 'Ulpianë', price: 1.19, distanceKm: 0.8, updated: 'dje, 14:33' },
  ] },
];

export const getLowestPrice = (product: Product) => [...product.prices].sort((a, b) => a.price - b.price)[0];
