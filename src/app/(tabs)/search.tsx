import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ProductCard } from '../../components/product-card';
import { demoProducts } from '../../data/demo-products';
import { palette, spacing } from '../../design/tokens';

const categories = ['Të gjitha', 'Ushqime', 'Bulmet', 'Shtëpi', 'Kujdes personal'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Të gjitha');
  const products = useMemo(() => demoProducts.filter((product) => {
    const matchesQuery = `${product.name} ${product.brand} ${product.category} ${product.barcode}`.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    return matchesQuery && (category === 'Të gjitha' || product.category === category);
  }), [query, category]);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>KATALOGU</Text>
      <Text style={styles.title}>Gjej çmimin{'\n'}më të mirë.</Text>
      <View style={styles.search}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Produkt, markë ose barkod" placeholderTextColor={palette.muted} style={styles.input} returnKeyType="search" />
        <Text style={styles.barcode}>▦</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((item) => <Text key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipActive]}>{item}</Text>)}
      </ScrollView>
      <View style={styles.resultsHeader}><Text style={styles.resultsTitle}>{query ? 'Rezultatet' : 'Produkte të njohura'}</Text><Text style={styles.count}>{products.length} produkte</Text></View>
      {products.length ? <View style={styles.grid}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</View> : <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Nuk u gjet produkt</Text><Text style={styles.emptyText}>Provo një emër ose kategori tjetër.</Text></View>}
      <Text style={styles.disclaimer}>Çmimet demonstrative · Përditësimet reale do të vijnë nga komuniteti.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas }, content: { padding: spacing.page, paddingBottom: 28 },
  kicker: { color: palette.leaf, fontSize: 10, letterSpacing: 1.6, fontWeight: '800', marginTop: 12 },
  title: { color: palette.ink, fontSize: 30, lineHeight: 34, fontWeight: '900', letterSpacing: -0.7, marginTop: 7, marginBottom: 18 },
  search: { height: 53, borderRadius: 16, backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 },
  searchIcon: { color: palette.muted, fontSize: 25, marginRight: 8 }, input: { flex: 1, color: palette.ink, fontSize: 13 }, barcode: { color: palette.forest, fontSize: 21 },
  chips: { gap: 8, paddingVertical: 16 }, chip: { overflow: 'hidden', color: palette.muted, backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, borderRadius: 18, paddingHorizontal: 13, paddingVertical: 8, fontSize: 11, fontWeight: '700' },
  chipActive: { color: palette.white, backgroundColor: palette.forest, borderColor: palette.forest },
  resultsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }, resultsTitle: { color: palette.ink, fontSize: 17, fontWeight: '800' }, count: { color: palette.muted, fontSize: 11 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  empty: { backgroundColor: palette.white, padding: 28, alignItems: 'center', borderRadius: 20, marginTop: 15 }, emptyIcon: { color: palette.leaf, fontSize: 34 }, emptyTitle: { color: palette.ink, fontSize: 16, fontWeight: '800', marginTop: 7 }, emptyText: { color: palette.muted, fontSize: 12, marginTop: 5 },
  disclaimer: { color: palette.muted, fontSize: 10, textAlign: 'center', marginTop: 14 },
});
