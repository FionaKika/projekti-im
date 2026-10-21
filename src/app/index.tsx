
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { artikujt } from '../data/artikujt';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✨</Text>
      <Text style={styles.title}>Lista ime</Text>
   

      <Text style={styles.subtitle}>
        Zgjidh një artikull për të parë detajet.
      </Text>

      <FlatList
        data={artikujt}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link
  href={{
    pathname: '/artikull/[id]',
    params: { id: item.id },
  }}
  asChild
>
            <Pressable style={styles.card}>
              <Text style={styles.cardTitle}>{item.titulli}</Text>
              <Text style={styles.description}>{item.pershkrimi}</Text>
              <Text style={styles.link}>Shiko detajet →</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34241F',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 34,
    marginBottom: 8,
  },
  title: {
    color: '#C0B0D2',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#E8D8CE',
    fontSize: 15,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#8C78A8',
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
  },
  cardTitle: {
    color: '#34241F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#34241F',
    fontSize: 15,
    marginBottom: 12,
  },
  link: {
    color: '#34241F',
    fontWeight: 'bold',
  },
});
