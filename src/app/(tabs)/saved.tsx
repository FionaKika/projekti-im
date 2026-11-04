import { Link } from 'expo-router';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { ProductCard } from '../../components/product-card';
import { useSavedProducts } from '../../context/saved-products';
import { useProducts } from '../../context/products';
import { palette, spacing } from '../../design/tokens';

export default function SavedScreen() {
  const { savedIds } = useSavedProducts();
  const { products: catalog, loading } = useProducts();
  const products = catalog.filter((product) => savedIds.includes(product.id));
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>LISTA IME</Text>
      <Text style={styles.title}>Të ruajtura</Text>
      <Text style={styles.subtitle}>Produktet që dëshiron t’i krahasosh përsëri.</Text>
      {loading ? <Text style={styles.emptyText}>Po ngarkohet lista…</Text> : products.length ? <View style={styles.grid}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</View> : (
        <View style={styles.empty}><Text style={styles.heart}>♡</Text><Text style={styles.emptyTitle}>Lista jote është bosh</Text><Text style={styles.emptyText}>Ruaj një produkt për të ndjekur çmimet e tij.</Text><Link href="/(tabs)/search" style={styles.button}>Gjej produkte  →</Link></View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas }, content: { padding: spacing.page, paddingTop: 28, paddingBottom: 30 },
  kicker: { color: palette.leaf, fontSize: 10, letterSpacing: 1.6, fontWeight: '800' }, title: { color: palette.ink, fontSize: 29, fontWeight: '900', marginTop: 7 },
  subtitle: { color: palette.muted, fontSize: 13, marginTop: 5, marginBottom: 20 }, grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  empty: { alignItems: 'center', backgroundColor: palette.white, borderRadius: 22, padding: 26, marginTop: 18 }, heart: { color: palette.leaf, fontSize: 44 }, emptyTitle: { color: palette.ink, fontSize: 16, fontWeight: '800', marginTop: 8 }, emptyText: { color: palette.muted, fontSize: 12, textAlign: 'center', marginTop: 5 },
  button: { backgroundColor: palette.forest, color: palette.white, overflow: 'hidden', paddingHorizontal: 17, paddingVertical: 12, borderRadius: 13, fontWeight: '800', marginTop: 17 },
});
