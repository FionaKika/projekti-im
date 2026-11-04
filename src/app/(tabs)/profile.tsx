import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { palette, spacing } from '../../design/tokens';

const options = [
  ['◎', 'Llogaria ime', 'Hyr ose krijo llogari'],
  ['⌖', 'Vendndodhja', 'Prishtinë, Kosovë'],
  ['♡', 'Produktet e ruajtura', 'Ndiq çmimet që të interesojnë'],
  ['◷', 'Aktiviteti im', 'Çmimet që ke raportuar'],
  ['?', 'Ndihmë dhe sugjerime', 'Na ndihmo ta përmirësojmë Pricely'],
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>PRICELY</Text>
      <Text style={styles.title}>Profili</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>P</Text></View>
        <View style={styles.profileCopy}><Text style={styles.profileName}>Mirë se erdhe!</Text><Text style={styles.profileHint}>Hyr për të ruajtur listat dhe kontributet.</Text></View>
      </View>
      <View style={styles.savingsCard}><Text style={styles.savingsKicker}>KURSIMI YT I MUAJIT</Text><Text style={styles.savings}>€0.00</Text><Text style={styles.savingsNote}>Krahaso çmimet për të nisur kursimin.</Text></View>
      <Text style={styles.sectionTitle}>Cilësimet</Text>
      <View style={styles.options}>
        {options.map(([icon, title, subtitle], index) => <View key={title} style={[styles.option, index === options.length - 1 && styles.lastOption]}><View style={styles.optionIcon}><Text style={styles.optionIconText}>{icon}</Text></View><View style={styles.optionCopy}><Text style={styles.optionTitle}>{title}</Text><Text style={styles.optionSubtitle}>{subtitle}</Text></View><Text style={styles.chevron}>›</Text></View>)}
      </View>
      <Text style={styles.version}>Pricely · versioni demonstrues 1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas }, content: { padding: spacing.page, paddingTop: 28, paddingBottom: 34 },
  kicker: { color: palette.leaf, fontSize: 10, letterSpacing: 1.6, fontWeight: '800' }, title: { color: palette.ink, fontSize: 29, fontWeight: '900', marginTop: 7, marginBottom: 18 },
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: palette.white, borderRadius: 20, borderWidth: 1, borderColor: palette.line },
  avatar: { width: 49, height: 49, borderRadius: 17, backgroundColor: palette.lime, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: palette.forest, fontSize: 19, fontWeight: '900' }, profileCopy: { marginLeft: 13, flex: 1 }, profileName: { color: palette.ink, fontWeight: '800', fontSize: 15 }, profileHint: { color: palette.muted, fontSize: 11, marginTop: 4 },
  savingsCard: { backgroundColor: palette.forest, borderRadius: 21, padding: 19, marginTop: 14, marginBottom: 23 }, savingsKicker: { color: palette.lime, fontSize: 9, letterSpacing: 1.4, fontWeight: '800' }, savings: { color: palette.white, fontSize: 31, fontWeight: '900', marginTop: 5 }, savingsNote: { color: '#CFDDD2', fontSize: 11 },
  sectionTitle: { color: palette.ink, fontSize: 16, fontWeight: '800', marginBottom: 9 }, options: { backgroundColor: palette.white, borderRadius: 20, paddingHorizontal: 14, borderColor: palette.line, borderWidth: 1 },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomColor: palette.line, borderBottomWidth: 1 }, lastOption: { borderBottomWidth: 0 }, optionIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: palette.soft, alignItems: 'center', justifyContent: 'center' }, optionIconText: { color: palette.forest, fontSize: 18, fontWeight: '700' }, optionCopy: { flex: 1, marginLeft: 11 }, optionTitle: { color: palette.ink, fontWeight: '700', fontSize: 12 }, optionSubtitle: { color: palette.muted, fontSize: 10, marginTop: 3 }, chevron: { color: palette.muted, fontSize: 23 },
  version: { color: palette.muted, fontSize: 10, textAlign: 'center', marginTop: 22 },
});
