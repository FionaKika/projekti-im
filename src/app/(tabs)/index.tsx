import { Link } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

import { ProductCard } from '../../components/product-card';
import { useProducts } from '../../context/products';
import { palette, spacing } from '../../design/tokens';

export default function HomeScreen() {
  const { products, loading, error } = useProducts();

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>pricely<Text style={styles.brandDot}>.</Text></Text>
          <Text style={styles.location}>⌖  Mitrovicë, Kosovë  ▾</Text>
        </View>
        <Link href="/(tabs)/profile" asChild>
          <Pressable style={styles.avatar} accessibilityLabel="Profili im">
            <Text style={styles.avatarText}>A</Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/(tabs)/search" asChild>
        <Pressable style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <Text style={styles.searchPlaceholder}>Kërko produkte ose markë</Text>
          <Text style={styles.searchScan}>▦</Text>
        </Pressable>
      </Link>

      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <Text style={styles.eyebrow}>BLERJE MË TË MENÇURA</Text>
        <Text style={styles.heroTitle}>Çmimi i mirë{'\n'}është afër.</Text>
        <Text style={styles.heroText}>Krahaso çmimet në dyqanet pranë teje.</Text>
        <Link href="/(tabs)/scan" asChild>
          <Pressable style={styles.heroButton}>
            <Text style={styles.heroButtonText}>▦  Skano produktin</Text>
            <Text style={styles.heroArrow}>→</Text>
          </Pressable>
        </Link>
        <Text style={styles.heroNote}>Skanim i shpejtë · Çmime nga komuniteti</Text>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Kursime afër teje</Text>
          <Text style={styles.sectionSub}>Katalogu i lexuar nga Supabase</Text>
        </View>
        <Link href="/(tabs)/search" style={styles.seeAll}>Shiko të gjitha  →</Link>
      </View>

      {loading ? <ActivityIndicator style={styles.loading} color={palette.forest} /> : error ? <Text style={styles.dataError}>{error}</Text> : products.length ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalCards}>
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} compact />)}
        </ScrollView>
      ) : <Text style={styles.dataError}>Supabase nuk ka produkte ende.</Text>}

      <View style={styles.tipCard}>
        <View style={styles.tipIcon}><Text style={styles.tipIconText}>✦</Text></View>
        <View style={styles.tipCopy}>
          <Text style={styles.tipTitle}>Çdo çmim ndihmon</Text>
          <Text style={styles.tipText}>Raporto një çmim dhe ndihmo lagjen të kursejë.</Text>
        </View>
        <Link href="/(tabs)/scan" style={styles.tipArrow}>→</Link>
      </View>
      <Text style={styles.disclaimer}>Produktet dhe çmimet e miratuara lexohen nga Supabase.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas },
  content: { paddingHorizontal: spacing.page, paddingTop: 16, paddingBottom: 28 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  brand: { color: palette.ink, fontSize: 28, fontWeight: '900', letterSpacing: -1.2 },
  brandDot: { color: palette.lime },
  location: { color: palette.muted, fontSize: 12, fontWeight: '600', marginTop: 1 },
  avatar: { width: 42, height: 42, borderRadius: 16, backgroundColor: palette.lilac, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: palette.ink, fontSize: 16, fontWeight: '800' },
  searchBox: { height: 52, borderRadius: 17, backgroundColor: palette.white, borderWidth: 1, borderColor: palette.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 18 },
  searchIcon: { color: palette.muted, fontSize: 26, marginRight: 10, marginTop: -4 },
  searchPlaceholder: { color: palette.muted, fontSize: 14, flex: 1 },
  searchScan: { color: palette.forest, fontSize: 20, fontWeight: '700' },
  hero: { overflow: 'hidden', position: 'relative', borderRadius: 26, backgroundColor: palette.forest, padding: 22, minHeight: 240, marginBottom: 26 },
  heroGlow: { position: 'absolute', right: -45, top: 30, width: 165, height: 165, borderRadius: 90, backgroundColor: '#315C43', opacity: 0.65 },
  eyebrow: { color: palette.lime, fontSize: 10, letterSpacing: 1.7, fontWeight: '800', marginBottom: 12 },
  heroTitle: { color: palette.white, fontSize: 31, lineHeight: 34, fontWeight: '800', letterSpacing: -0.7 },
  heroText: { color: '#D0DDD3', fontSize: 13, marginTop: 9 },
  heroButton: { height: 43, marginTop: 17, backgroundColor: palette.lime, borderRadius: 14, paddingHorizontal: 13, alignItems: 'center', flexDirection: 'row', alignSelf: 'flex-start', gap: 14 },
  heroButtonText: { color: palette.ink, fontWeight: '800', fontSize: 13 },
  heroArrow: { color: palette.ink, fontSize: 18, fontWeight: '700' },
  heroNote: { color: '#ADC0B2', fontSize: 10, marginTop: 11 },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { color: palette.ink, fontSize: 19, fontWeight: '800', letterSpacing: -0.3 },
  sectionSub: { color: palette.muted, fontSize: 12, marginTop: 3 },
  seeAll: { color: palette.forest, fontSize: 11, fontWeight: '700', paddingBottom: 2 },
  horizontalCards: { gap: 12, paddingBottom: 5 },
  loading: { marginVertical: 24 }, dataError: { color: palette.muted, fontSize: 12, lineHeight: 18, paddingVertical: 16 },
  tipCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#EEF1E8', borderRadius: 18, marginTop: 19, padding: 15 },
  tipIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: palette.lime, alignItems: 'center', justifyContent: 'center' },
  tipIconText: { color: palette.forest, fontSize: 19, fontWeight: '800' },
  tipCopy: { flex: 1 },
  tipTitle: { color: palette.ink, fontWeight: '800', fontSize: 13 },
  tipText: { color: palette.muted, fontSize: 11, lineHeight: 16, marginTop: 3 },
  tipArrow: { color: palette.forest, fontSize: 20, fontWeight: '700' },
  disclaimer: { textAlign: 'center', color: palette.muted, fontSize: 10, marginTop: 16 },
});
