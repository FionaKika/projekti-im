import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Product } from '../data/demo-products';
import { getLowestPrice } from '../data/demo-products';
import { palette } from '../design/tokens';

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const lowest = getLowestPrice(product);
  const highest = product.prices.length ? Math.max(...product.prices.map((price) => price.price)) : 0;
  const discount = lowest && highest > lowest.price ? Math.round((1 - lowest.price / highest) * 100) : null;
  return (
    <Link href={{ pathname: '/product/[id]', params: { id: product.id } }} asChild>
      <Pressable style={StyleSheet.flatten([styles.card, compact && styles.compact])}>
        <View style={[styles.productImage, { backgroundColor: product.color }, compact && styles.compactImage]}>
          <Text style={styles.emoji}>{product.emoji}</Text>
          {discount !== null && <View style={styles.discount}><Text style={styles.discountText}>−{discount}%</Text></View>}
        </View>
        <Text style={styles.brand}>{product.brand} · {product.amount}</Text>
        <Text numberOfLines={1} style={styles.name}>{product.name}</Text>
        {lowest ? <>
          <View style={styles.priceRow}><Text style={styles.price}>€{lowest.price.toFixed(2)}</Text><Text style={styles.store}>{lowest.store}</Text></View>
          <Text style={styles.location}>{lowest.area}</Text>
        </> : <>
          <Text style={styles.noPrice}>Pa çmime ende</Text>
          <Text style={styles.location}>Raporto çmimin e parë</Text>
        </>}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', backgroundColor: palette.white, borderRadius: 19, padding: 10, borderColor: palette.line, borderWidth: 1, marginBottom: 12 },
  compact: { width: 166, marginBottom: 0 },
  productImage: { height: 128, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  compactImage: { height: 120 }, emoji: { fontSize: 56 },
  discount: { position: 'absolute', top: 8, left: 8, borderRadius: 8, backgroundColor: palette.lime, paddingHorizontal: 7, paddingVertical: 4 },
  discountText: { color: palette.ink, fontSize: 10, fontWeight: '800' },
  brand: { color: palette.muted, fontSize: 9, fontWeight: '600' }, name: { color: palette.ink, fontSize: 13, fontWeight: '800', marginTop: 3 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8 },
  price: { color: palette.forest, fontSize: 17, fontWeight: '900' }, store: { color: palette.muted, fontSize: 9, fontWeight: '700' },
  noPrice: { color: palette.forest, fontSize: 13, fontWeight: '900', marginTop: 8 },
  location: { color: palette.muted, fontSize: 9, marginTop: 3 },
});
