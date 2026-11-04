import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { demoProducts, type Product, type StorePrice } from '../data/demo-products';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type ProductRow = Pick<Product, 'id' | 'barcode' | 'name' | 'brand' | 'category' | 'amount'>;
type PriceReportRow = {
  product_id: string;
  store_name: string;
  price: number;
  latitude: number;
  longitude: number;
  created_at: string;
};

type ProductContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      if (!isSupabaseConfigured || !supabase) {
        setError('Lidhja me Supabase nuk është konfiguruar.');
        setLoading(false);
        return;
      }

      const [productResult, reportResult] = await Promise.all([
        supabase
          .from('products')
          .select('id, barcode, name, brand, category, amount')
          .order('name'),
        supabase
          .from('price_reports')
          .select('product_id, store_name, price, latitude, longitude, created_at')
          .eq('status', 'approved')
          .order('price'),
      ]);

      if (!active) return;
      if (productResult.error) {
        setError(`Produktet nuk u ngarkuan: ${productResult.error.message}`);
        setLoading(false);
        return;
      }
      if (reportResult.error) {
        setError(`Çmimet nuk u ngarkuan: ${reportResult.error.message}`);
        setLoading(false);
        return;
      }

      const pricesByProduct = new Map<string, StorePrice[]>();
      for (const report of (reportResult.data ?? []) as PriceReportRow[]) {
        const prices = pricesByProduct.get(report.product_id) ?? [];
        prices.push({
          store: report.store_name,
          area: 'Vendndodhje e raportuar',
          price: Number(report.price),
          updated: new Date(report.created_at).toLocaleString('sq-AL'),
          latitude: report.latitude,
          longitude: report.longitude,
        });
        pricesByProduct.set(report.product_id, prices);
      }

      const appearanceById = new Map(demoProducts.map((product) => [product.id, product]));
      const rows = (productResult.data ?? []) as ProductRow[];
      setProducts(rows.map((row) => {
        const appearance = appearanceById.get(row.id);
        return {
          ...row,
          emoji: appearance?.emoji ?? '🛍️',
          color: appearance?.color ?? '#E8EEE6',
          prices: pricesByProduct.get(row.id) ?? [],
        };
      }));
      setError(null);
      setLoading(false);
    }

    void loadProducts().catch((loadError: unknown) => {
      if (!active) return;
      setError(loadError instanceof Error ? loadError.message : 'Nuk u lidh me Supabase.');
      setLoading(false);
    });

    return () => { active = false; };
  }, []);

  return <ProductContext.Provider value={{ products, loading, error }}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts duhet të përdoret brenda ProductsProvider.');
  return context;
}
