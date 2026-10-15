
import MesazhiIm from '@/components/MesazhiIm';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

let numriMeLet = 0;

export default function HomeScreen() {
  const [numri, setNumri] = useState(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>
            Përshëndetje!
          </Text>
          <Text style={styles.subtitle}>
            Mirë se erdhe në projektin tim
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Komponenti im
          </Text>
          <MesazhiIm />
        </View>

        <View style={styles.counterCard}>
          <Text style={styles.sectionTitle}>
            Provo numëruesin
          </Text>

          <Text style={styles.description}>
            Ky numër ndryshon sa herë që shtyp butonin.
          </Text>

          <View style={styles.numberBox}>
            <Text style={styles.number}>{numri}</Text>
            <Text style={styles.numberLabel}>
              {numri === 1 ? 'klikim' : 'klikime'}
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressedButton,
            ]}
            onPress={() => setNumri(n => n + 1)}
          >
            <Text style={styles.primaryButtonText}>
              + Rrit numrin
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => setNumri(0)}
          >
            <Text style={styles.secondaryButtonText}>
              Rivendos numrin
            </Text>
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            Prova me let
          </Text>
          <Text style={styles.description}>
            Shtype butonin dhe kontrollo terminalin
            për të parë rezultatin.
          </Text>

                 <Pressable
            style={styles.letButton}
            onPress={() => {
              numriMeLet++;
              console.log('Numri me let:', numriMeLet);
            }}
          >
            <Text style={styles.letButtonText}>
              Provo variablën let
            </Text>
          </Pressable>
        </View>

        {Platform.OS === 'web' && (
          <Text style={styles.footer}>
            Projekti im në React Native
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#34241F',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
    gap: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  emoji: {
    fontSize: 38,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#C0B0D2',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#E8D8CE',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#8C78A8',
    padding: 18,
    borderRadius: 20,
    gap: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#34241F',
  },
  counterCard: {
    backgroundColor: '#C0B0D2',
    padding: 20,
    borderRadius: 20,
    gap: 14,
    elevation: 2,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#51435F',
  },
  numberBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0D6E9',
    borderRadius: 16,
    paddingVertical: 18,
    gap: 2,
  },
  number: {
    fontSize: 44,
    fontWeight: '800',
    color: '#34241F',
  },
  numberLabel: {
    fontSize: 14,
    color: '#51435F',
  },
  primaryButton: {
    backgroundColor: '#A0A45E',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#282819',
    fontSize: 16,
    fontWeight: '700',
  },
  pressedButton: {
    opacity: 0.75,
  },
  secondaryButton: {
    backgroundColor: '#687B62',
    borderWidth: 1,
    borderColor: '#A0A45E',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#687B62',
    padding: 18,
    borderRadius: 20,
    gap: 12,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
    letButton: {
    backgroundColor:  '#A0A45E',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  letButtonText: {
    color: '#282819',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: '#E8D8CE',
    marginTop: 4,
  },
});

