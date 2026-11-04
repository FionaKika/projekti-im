import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { demoProducts } from '../../data/demo-products';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { palette, spacing } from '../../design/tokens';

export default function ReportPriceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = demoProducts.find((item) => item.id === id);
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [price, setPrice] = useState('');
  const [store, setStore] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageIsError, setMessageIsError] = useState(false);

  async function addLocation() {
    setGettingLocation(true);
    setMessage(null);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) throw new Error('Lejo vendndodhjen për të shtuar dyqanin pranë teje.');
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setCoordinates({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Nuk u mor vendndodhja.');
      setMessageIsError(true);
    } finally {
      setGettingLocation(false);
    }
  }

  async function openCamera() {
    if (!cameraPermission?.granted) {
      const result = await requestCameraPermission();
      if (!result.granted) {
        setMessage('Lejo kamerën për të fotografuar etiketën e çmimit.');
        setMessageIsError(true);
        return;
      }
    }
    setShowCamera(true);
  }

  async function capturePhoto() {
    const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
    if (photo?.uri) {
      setPhotoUri(photo.uri);
      setShowCamera(false);
    }
  }

  async function submitReport() {
    if (!product) return;
    const numericPrice = Number(price.replace(',', '.'));
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setMessage('Shkruaj një çmim të vlefshëm.');
      setMessageIsError(true);
      return;
    }
    if (!store.trim()) {
      setMessage('Shkruaj emrin e dyqanit.');
      setMessageIsError(true);
      return;
    }
    if (!photoUri) {
      setMessage('Bëj një foto të etiketës së çmimit si dëshmi.');
      setMessageIsError(true);
      return;
    }
    if (!coordinates) {
      setMessage('Shto vendndodhjen e dyqanit për të vazhduar.');
      setMessageIsError(true);
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setMessage('Raportimi online nuk është lidhur ende. Plotëso .env dhe konfiguro tabelat në Supabase.');
      setMessageIsError(true);
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      const photoResponse = await fetch(photoUri);
      const photoBlob = await photoResponse.blob();
      const filePath = `pending/${Date.now()}-${product.id}.jpg`;
      const { data: uploadedPhoto, error: uploadError } = await supabase.storage
        .from('price-evidence')
        .upload(filePath, photoBlob, { contentType: 'image/jpeg', upsert: false });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from('price_reports').insert({
        product_id: product.id,
        store_name: store.trim(),
        price: numericPrice,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        evidence_path: uploadedPhoto.path,
        status: 'pending',
      });
      if (insertError) throw insertError;
      setMessage('Raportimi u dërgua për verifikim. Faleminderit që ndihmon komunitetin!');
      setMessageIsError(false);
    } catch (error) {
      setMessage(error instanceof Error ? `Raportimi dështoi: ${error.message}` : 'Raportimi dështoi. Provo përsëri.');
      setMessageIsError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (!product) return <View style={styles.notFound}><Text style={styles.title}>Produkti nuk u gjet.</Text></View>;

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Pressable onPress={() => router.back()}><Text style={styles.back}>‹  Kthehu te krahasimi</Text></Pressable>
      <Text style={styles.kicker}>KONTRIBUO</Text>
      <Text style={styles.title}>Raporto çmimin.</Text>
      <Text style={styles.subtitle}>Shto çmimin që pe në dyqan. Raportimet publikohen pasi të verifikohen.</Text>
      <View style={styles.product}><Text style={styles.productEmoji}>{product.emoji}</Text><View><Text style={styles.productName}>{product.name}</Text><Text style={styles.productBrand}>{product.brand} · {product.amount}</Text></View></View>

      <Text style={styles.label}>ÇMIMI NË DYQAN</Text>
      <View style={styles.inputWrap}><Text style={styles.currency}>€</Text><TextInput value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor="#A0AAA2" style={styles.priceInput} /></View>
      <Text style={styles.label}>EMRI I DYQANIT</Text>
      <TextInput value={store} onChangeText={setStore} placeholder="p.sh. Viva Fresh" placeholderTextColor="#A0AAA2" style={styles.textInput} />

      <Text style={styles.label}>DËSHMIA E ÇMIMIT</Text>
      {photoUri ? <View style={styles.photoPreview}><Image source={{ uri: photoUri }} contentFit="cover" style={styles.photo} /><Pressable onPress={() => setPhotoUri(null)} style={styles.removePhoto}><Text style={styles.removeText}>Hiqe foton</Text></Pressable></View> : showCamera ? (
        <View style={styles.cameraWrap}><CameraView ref={cameraRef} style={styles.camera} facing="back" mode="picture" /><Pressable onPress={() => void capturePhoto()} style={styles.capture}><View style={styles.captureInner} /></Pressable></View>
      ) : <Pressable onPress={() => void openCamera()} style={styles.photoButton}><Text style={styles.photoIcon}>▧</Text><Text style={styles.photoTitle}>Fotografo etiketën e çmimit</Text><Text style={styles.photoHint}>Fotoja përdoret për verifikimin e raportimit.</Text></Pressable>}

      <Text style={styles.label}>VENDNDODHJA E DYQANIT</Text>
      <Pressable onPress={() => void addLocation()} style={styles.locationButton}>
        {gettingLocation ? <ActivityIndicator color={palette.forest} /> : <Text style={styles.locationIcon}>{coordinates ? '✓' : '⌖'}</Text>}
        <View style={styles.locationCopy}><Text style={styles.locationTitle}>{coordinates ? 'Vendndodhja u shtua' : 'Shto vendndodhjen'}</Text><Text style={styles.locationHint}>{coordinates ? `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}` : 'GPS aktivizohet vetëm kur e kërkon ti.'}</Text></View>
        <Text style={styles.locationArrow}>›</Text>
      </Pressable>
      {message && <Text accessibilityRole="alert" style={[styles.message, messageIsError && styles.error]}>{message}</Text>}
      <Pressable disabled={submitting} onPress={() => void submitReport()} style={[styles.submit, submitting && styles.submitDisabled]}>
        {submitting ? <ActivityIndicator color={palette.ink} /> : <Text style={styles.submitText}>Dërgo për verifikim  →</Text>}
      </Pressable>
      <Text style={styles.privacy}>Raportimi yt shfaqet publikisht vetëm pasi të miratohet.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: palette.canvas }, content: { padding: spacing.page, paddingTop: 22, paddingBottom: 34 },
  back: { color: palette.forest, fontSize: 12, fontWeight: '800', marginBottom: 19 }, kicker: { color: palette.leaf, fontSize: 10, letterSpacing: 1.5, fontWeight: '900' }, title: { color: palette.ink, fontSize: 27, fontWeight: '900', marginTop: 6 }, subtitle: { color: palette.muted, fontSize: 12, lineHeight: 18, marginTop: 6, marginBottom: 17 },
  product: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: palette.white, padding: 13, borderRadius: 16, borderColor: palette.line, borderWidth: 1, marginBottom: 21 }, productEmoji: { fontSize: 33 }, productName: { color: palette.ink, fontSize: 13, fontWeight: '800' }, productBrand: { color: palette.muted, fontSize: 10, marginTop: 3 }, label: { color: palette.leaf, fontSize: 9, letterSpacing: 1.1, fontWeight: '900', marginBottom: 7, marginTop: 13 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', height: 52, paddingHorizontal: 14, backgroundColor: palette.white, borderRadius: 14, borderColor: palette.line, borderWidth: 1 }, currency: { color: palette.forest, fontSize: 19, fontWeight: '800', marginRight: 8 }, priceInput: { flex: 1, color: palette.ink, fontSize: 18, fontWeight: '800' }, textInput: { height: 49, paddingHorizontal: 14, color: palette.ink, backgroundColor: palette.white, borderRadius: 14, borderColor: palette.line, borderWidth: 1, fontSize: 13 },
  photoButton: { height: 128, borderRadius: 16, borderColor: '#CBD5C5', borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFCF9' }, photoIcon: { color: palette.forest, fontSize: 28 }, photoTitle: { color: palette.ink, fontSize: 12, fontWeight: '800', marginTop: 5 }, photoHint: { color: palette.muted, fontSize: 10, marginTop: 4 }, cameraWrap: { height: 220, overflow: 'hidden', borderRadius: 16, backgroundColor: '#13221A' }, camera: { flex: 1 }, capture: { position: 'absolute', alignSelf: 'center', bottom: 12, width: 54, height: 54, borderRadius: 28, borderWidth: 4, borderColor: palette.white, alignItems: 'center', justifyContent: 'center' }, captureInner: { width: 37, height: 37, borderRadius: 20, backgroundColor: palette.white }, photoPreview: { height: 160, borderRadius: 16, overflow: 'hidden' }, photo: { width: '100%', height: '100%' }, removePhoto: { position: 'absolute', top: 9, right: 9, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9, backgroundColor: '#FFFFFFE8' }, removeText: { color: palette.ink, fontSize: 10, fontWeight: '800' },
  locationButton: { minHeight: 64, borderRadius: 15, backgroundColor: palette.white, borderColor: palette.line, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 }, locationIcon: { color: palette.forest, fontSize: 22, width: 32 }, locationCopy: { flex: 1 }, locationTitle: { color: palette.ink, fontSize: 12, fontWeight: '800' }, locationHint: { color: palette.muted, fontSize: 9, marginTop: 4 }, locationArrow: { color: palette.muted, fontSize: 22 },
  message: { color: palette.forest, backgroundColor: '#E7F2D5', padding: 11, borderRadius: 12, fontSize: 11, lineHeight: 17, marginTop: 13 }, error: { color: palette.danger, backgroundColor: '#FCEAE6' }, submit: { alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 15, backgroundColor: palette.lime, marginTop: 16 }, submitDisabled: { opacity: 0.6 }, submitText: { color: palette.forest, fontSize: 13, fontWeight: '900' }, privacy: { color: palette.muted, fontSize: 9, textAlign: 'center', marginTop: 10 }, notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
