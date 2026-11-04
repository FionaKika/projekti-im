import { CameraView, useCameraPermissions } from 'expo-camera';
import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { demoProducts } from '../../data/demo-products';
import { palette, spacing } from '../../design/tokens';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [focused, setFocused] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [notFound, setNotFound] = useState<string | null>(null);

  useFocusEffect(useCallback(() => {
    setFocused(true);
    return () => setFocused(false);
  }, []));

  const onBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    const product = demoProducts.find((item) => item.barcode === data);
    if (product) router.push({ pathname: '/product/[id]', params: { id: product.id } });
    else setNotFound(data);
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}><Text style={styles.kicker}>SKANER</Text><Text style={styles.title}>Gjej çmimin.</Text><Text style={styles.subtitle}>Drejto kamerën te barkodi i produktit.</Text></View>
      {!permission ? <View style={styles.permission}><ActivityIndicator color={palette.lime} /></View> : !permission.granted ? (
        <View style={styles.permission}><Text style={styles.permissionIcon}>▦</Text><Text style={styles.permissionTitle}>Skano produktin</Text><Text style={styles.permissionText}>Pricely përdor kamerën vetëm kur ti nis skanimin.</Text><Pressable onPress={requestPermission} style={styles.primaryButton}><Text style={styles.primaryText}>Lejo kamerën</Text></Pressable></View>
      ) : focused ? (
        <View style={styles.cameraWrap}>
          <CameraView style={styles.camera} facing="back" barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128'] }} onBarcodeScanned={scanned ? undefined : onBarcodeScanned} />
          <View pointerEvents="none" style={styles.cameraOverlay}><View style={styles.scanFrame}><View style={styles.scanLine} /></View><Text style={styles.cameraHint}>Vendose barkodin brenda kornizës</Text></View>
          {scanned && <View style={styles.result}><Text style={styles.resultTitle}>{notFound ? 'Produkti nuk është në katalog' : 'Produkti u skanua'}</Text><Text style={styles.resultText}>{notFound ? `Barkodi: ${notFound}. Kërkoje me emër ose raporto produktin.` : 'Po hapim krahasimin…'}</Text>{notFound && <><Link href="/(tabs)/search" style={styles.resultLink}>Kërko produktin</Link><Pressable onPress={() => { setScanned(false); setNotFound(null); }}><Text style={styles.scanAgain}>Skano përsëri</Text></Pressable></>}</View>}
        </View>
      ) : <View style={styles.cameraPaused}><Text style={styles.permissionText}>Skaneri është ndalur derisa të kthehesh te ky ekran.</Text></View>}
      <View style={styles.footer}><Text style={styles.footerIcon}>✦</Text><View style={styles.footerCopy}><Text style={styles.footerTitle}>Nuk ka barkod?</Text><Text style={styles.footerText}>Kërko produktin me emër në katalog.</Text></View><Link href="/(tabs)/search" style={styles.footerArrow}>→</Link></View>
      <Text style={styles.disclaimer}>Krahasimi shfaqet për produktet në katalogun demonstrues.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas, paddingHorizontal: spacing.page, paddingTop: 19, paddingBottom: 10 },
  header: { marginBottom: 15 }, kicker: { color: palette.leaf, fontSize: 10, fontWeight: '800', letterSpacing: 1.6 }, title: { color: palette.ink, fontSize: 27, fontWeight: '900', marginTop: 4 }, subtitle: { color: palette.muted, fontSize: 12, marginTop: 4 },
  permission: { flex: 1, borderRadius: 25, backgroundColor: palette.forest, alignItems: 'center', justifyContent: 'center', padding: 28 }, permissionIcon: { color: palette.lime, fontSize: 46 }, permissionTitle: { color: palette.white, fontSize: 20, fontWeight: '800', marginTop: 12 }, permissionText: { color: '#CFDDD2', textAlign: 'center', fontSize: 12, lineHeight: 18, marginTop: 6 }, primaryButton: { backgroundColor: palette.lime, borderRadius: 13, paddingHorizontal: 20, paddingVertical: 12, marginTop: 17 }, primaryText: { color: palette.ink, fontSize: 13, fontWeight: '800' },
  cameraWrap: { flex: 1, overflow: 'hidden', borderRadius: 25, backgroundColor: '#14221A' }, camera: { flex: 1 }, cameraOverlay: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }, scanFrame: { width: '75%', height: 180, borderColor: palette.lime, borderWidth: 2, borderRadius: 20, justifyContent: 'center', overflow: 'hidden' }, scanLine: { height: 2, backgroundColor: palette.lime, opacity: 0.8 }, cameraHint: { color: palette.white, fontSize: 12, fontWeight: '700', marginTop: 18, textShadowColor: '#000', textShadowRadius: 5 },
  result: { position: 'absolute', left: 12, right: 12, bottom: 12, borderRadius: 17, backgroundColor: palette.white, padding: 15 }, resultTitle: { color: palette.ink, fontSize: 15, fontWeight: '800' }, resultText: { color: palette.muted, fontSize: 11, marginTop: 5 }, resultLink: { alignSelf: 'flex-start', color: palette.forest, backgroundColor: palette.lime, overflow: 'hidden', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 10, fontSize: 11, fontWeight: '800', marginTop: 11 }, scanAgain: { color: palette.forest, fontSize: 11, fontWeight: '700', marginTop: 11 },
  cameraPaused: { flex: 1, borderRadius: 25, backgroundColor: palette.forest, alignItems: 'center', justifyContent: 'center', padding: 25 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 14, padding: 14, backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, borderRadius: 17 }, footerIcon: { color: palette.forest, fontSize: 22 }, footerCopy: { flex: 1 }, footerTitle: { color: palette.ink, fontSize: 12, fontWeight: '800' }, footerText: { color: palette.muted, fontSize: 10, marginTop: 3 }, footerArrow: { color: palette.forest, fontSize: 20, fontWeight: '800' }, disclaimer: { color: palette.muted, textAlign: 'center', fontSize: 9, marginTop: 9 },
});
