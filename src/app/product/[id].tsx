import { Link, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useSavedProducts } from '../../context/saved-products';
import { useProducts } from '../../context/products';
import { getLowestPrice } from '../../data/demo-products';
import { palette, spacing } from '../../design/tokens';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const product = products.find((item) => item.id === id);
  const { isSaved, toggleSaved } = useSavedProducts();

  if (!product && loading) return <View style={styles.notFound}><Text style={styles.title}>Po ngarkohen produktet…</Text></View>;
  if (!product) return <View style={styles.notFound}><Text style={styles.title}>{error ?? 'Produkti nuk u gjet.'}</Text><Pressable onPress={() => router.back()}><Text style={styles.backText}>← Kthehu prapa</Text></Pressable></View>;

  const lowest = getLowestPrice(product);
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const savings = sortedPrices.length > 1 && lowest
    ? sortedPrices[sortedPrices.length - 1].price - lowest.price
    : 0;

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.topbar}>
        <Pressable onPress={() => router.back()} style={styles.topButton}><Text style={styles.topButtonText}>‹</Text></Pressable>
        <Text style={styles.topTitle}>Krahasimi i çmimeve</Text>
        <Pressable onPress={() => toggleSaved(product.id)} style={styles.topButton} accessibilityLabel={isSaved(product.id) ? 'Hiqe nga të ruajturat' : 'Ruaje produktin'}><Text style={[styles.heart, isSaved(product.id) && styles.heartActive]}>{isSaved(product.id) ? '♥' : '♡'}</Text></Pressable>
      </View>
      <View style={[styles.productImage, { backgroundColor: product.color }]}><Text style={styles.emoji}>{product.emoji}</Text><View style={styles.demoTag}><Text style={styles.demoText}>KATALOGU I LIDHUR</Text></View></View>
      <Text style={styles.brand}>{product.brand.toUpperCase()} · {product.amount}</Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.category}>{product.category}  ·  Barkodi {product.barcode}</Text>

      {lowest ? <View style={styles.bestDeal}>
        <View style={styles.bestBadge}><Text style={styles.bestBadgeText}>ÇMIMI MË I MIRË</Text></View>
        <View style={styles.bestRow}><View><Text style={styles.bestStore}>{lowest.store}</Text><Text style={styles.bestLocation}>⌖  {lowest.area}</Text></View><Text style={styles.bestPrice}>€{lowest.price.toFixed(2)}</Text></View>
        {savings > 0 && <View style={styles.savingLine}><Text style={styles.savingText}>Kursen deri në</Text><Text style={styles.savingAmount}>€{savings.toFixed(2)}</Text><Text style={styles.savingText}>për këtë produkt</Text></View>}
      </View> : <View style={styles.noPrices}><Text style={styles.noPricesTitle}>Ende s’ka çmime të miratuara</Text><Text style={styles.noPricesText}>Shto çmimin që pe në dyqan. Ai shfaqet këtu pas verifikimit.</Text></View>}

      <View style={styles.sectionHeading}><View><Text style={styles.sectionTitle}>Krahaso dyqanet</Text><Text style={styles.sectionSubtitle}>Sipas çmimit më të ulët</Text></View><Text style={styles.shopCount}>{sortedPrices.length} dyqane</Text></View>
      {sortedPrices.map((price, index) => <View key={`${price.store}-${price.updated}-${price.price}`} style={[styles.priceCard, index === 0 && styles.firstPriceCard]}>
        <View style={[styles.storeMark, index === 0 && styles.firstStoreMark]}><Text style={styles.storeMarkText}>{price.store.slice(0, 1)}</Text></View>
        <View style={styles.storeDetails}><Text style={styles.storeName}>{price.store}</Text><Text style={styles.storeArea}>⌖  {price.area}</Text><Text style={styles.updated}>Përditësuar {price.updated}</Text></View>
        <View style={styles.priceDetails}><Text style={[styles.shopPrice, index === 0 && styles.lowestPrice]}>€{price.price.toFixed(2)}</Text>{index === 0 && <Text style={styles.lowestLabel}>MË I LIRI</Text>}</View>
      </View>)}

      <View style={styles.mapCard}><Text style={styles.mapLabel}>Vendndodhjet</Text><Text style={styles.mapHint}>{sortedPrices.length ? `${sortedPrices.length} çmime të aprovuara me dyqan të raportuar.` : 'Harta mbushet pasi të miratohen raportimet me GPS.'}</Text></View>

      <Link href={{ pathname: '/report/[id]', params: { id: product.id } }} asChild><Pressable style={styles.reportButton}><Text style={styles.reportButtonText}>＋  Raporto një çmim</Text></Pressable></Link>
      <Text style={styles.footerNote}>Çmimet vijnë nga raportimet e miratuara në Supabase.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas }, content: { padding: spacing.page, paddingBottom: 32 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 5, marginBottom: 13 }, topButton: { height: 38, width: 38, borderRadius: 13, backgroundColor: palette.white, alignItems: 'center', justifyContent: 'center', borderColor: palette.line, borderWidth: 1 }, topButtonText: { color: palette.ink, fontSize: 29, lineHeight: 32 }, topTitle: { color: palette.ink, fontSize: 13, fontWeight: '800' }, heart: { color: palette.ink, fontSize: 22 }, heartActive: { color: '#D35F54' },
  productImage: { height: 202, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 17 }, emoji: { fontSize: 88 }, demoTag: { position: 'absolute', top: 12, right: 12, backgroundColor: '#FFFFFFD9', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 }, demoText: { color: palette.muted, fontSize: 8, fontWeight: '900', letterSpacing: 0.5 },
  brand: { color: palette.leaf, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 }, title: { color: palette.ink, fontSize: 25, fontWeight: '900', marginTop: 5 }, category: { color: palette.muted, fontSize: 11, marginTop: 5, marginBottom: 17 },
  bestDeal: { backgroundColor: palette.forest, borderRadius: 20, padding: 16, marginBottom: 22 }, bestBadge: { alignSelf: 'flex-start', borderRadius: 7, backgroundColor: palette.lime, paddingHorizontal: 8, paddingVertical: 5 }, bestBadgeText: { color: palette.forest, fontSize: 9, fontWeight: '900', letterSpacing: 0.7 }, bestRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }, bestStore: { color: palette.white, fontWeight: '800', fontSize: 17 }, bestLocation: { color: '#C7D8CB', fontSize: 11, marginTop: 5 }, bestPrice: { color: palette.lime, fontSize: 26, fontWeight: '900' }, savingLine: { flexDirection: 'row', gap: 4, alignItems: 'center', marginTop: 12, borderTopColor: '#47725A', borderTopWidth: 1, paddingTop: 10 }, savingText: { color: '#C7D8CB', fontSize: 10 }, savingAmount: { color: palette.lime, fontSize: 11, fontWeight: '900' },
  noPrices: { padding: 16, borderRadius: 18, backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, marginBottom: 20 }, noPricesTitle: { color: palette.ink, fontSize: 13, fontWeight: '800' }, noPricesText: { color: palette.muted, fontSize: 11, lineHeight: 17, marginTop: 5 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }, sectionTitle: { color: palette.ink, fontSize: 16, fontWeight: '900' }, sectionSubtitle: { color: palette.muted, fontSize: 10, marginTop: 3 }, shopCount: { color: palette.forest, backgroundColor: '#E8EEE6', borderRadius: 9, paddingHorizontal: 9, paddingVertical: 6, fontSize: 10, fontWeight: '800' },
  priceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, borderRadius: 16, padding: 12, marginBottom: 8 }, firstPriceCard: { borderColor: '#B9D18A', backgroundColor: '#FCFDF9' }, storeMark: { width: 38, height: 38, borderRadius: 13, backgroundColor: palette.soft, alignItems: 'center', justifyContent: 'center' }, firstStoreMark: { backgroundColor: palette.lime }, storeMarkText: { color: palette.forest, fontWeight: '900', fontSize: 16 }, storeDetails: { flex: 1, marginLeft: 11 }, storeName: { color: palette.ink, fontSize: 12, fontWeight: '800' }, storeArea: { color: palette.muted, fontSize: 10, marginTop: 3 }, updated: { color: '#9BA49C', fontSize: 9, marginTop: 3 }, priceDetails: { alignItems: 'flex-end' }, shopPrice: { color: palette.ink, fontWeight: '900', fontSize: 16 }, lowestPrice: { color: palette.forest }, lowestLabel: { color: palette.leaf, fontSize: 8, fontWeight: '900', marginTop: 3 },
  mapCard: { overflow: 'hidden', backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, borderRadius: 18, marginTop: 13, paddingBottom: 13 }, mapArtwork: { height: 110, backgroundColor: '#E8EFE5', overflow: 'hidden' }, mapRoad: { position: 'absolute', width: 360, height: 13, backgroundColor: '#FAFBF7', top: 38, left: -40, transform: [{ rotate: '-15deg' }] }, mapRoadTwo: { position: 'absolute', width: 220, height: 11, backgroundColor: '#FAFBF7', top: 58, left: 50, transform: [{ rotate: '47deg' }] }, mapRoadThree: { position: 'absolute', width: 200, height: 9, backgroundColor: '#D7E4D2', top: 10, right: -50, transform: [{ rotate: '35deg' }] }, mapPin: { position: 'absolute', left: '28%', top: '40%', zIndex: 2, color: palette.forest, fontSize: 19, textShadowColor: '#FFFFFF', textShadowRadius: 5 }, mapPinTwo: { left: '58%', top: '25%', color: '#A1BE53' }, mapPinThree: { left: '72%', top: '65%', color: '#DA8E68' }, mapLabel: { color: palette.ink, fontSize: 12, fontWeight: '800', marginHorizontal: 13, marginTop: 11 }, mapHint: { color: palette.muted, fontSize: 10, marginHorizontal: 13, marginTop: 4 },
  reportButton: { alignItems: 'center', justifyContent: 'center', height: 49, borderRadius: 15, backgroundColor: palette.lime, marginTop: 16 }, reportButtonText: { color: palette.forest, fontSize: 13, fontWeight: '900' }, footerNote: { color: palette.muted, fontSize: 9, textAlign: 'center', marginTop: 11 },
  notFound: { flex: 1, backgroundColor: palette.canvas, alignItems: 'center', justifyContent: 'center' }, backText: { color: palette.forest, marginTop: 12, fontWeight: '700' },
});
