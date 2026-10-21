
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { artikujt } from '../../data/artikujt';

export default function ArtikullDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const artikulli = artikujt.find((item) => item.id === id);

  if (!artikulli) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Artikulli nuk u gjet.</Text>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Kthehu prapa</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detajet</Text>
      <View style={styles.card}>
        <Text style={styles.title}>{artikulli.titulli}</Text>
        <Text style={styles.description}>{artikulli.pershkrimi}</Text>
      </View>

      <Pressable onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>← Kthehu te lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34241F',
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    color: '#C0B0D2',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#E8D8CE',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  title: {
    color: '#34241F',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: '#51435F',
    fontSize: 17,
    lineHeight: 25,
  },
  button: {
    backgroundColor: '#A0A45E',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#282819',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
