
import { StyleSheet, Text, View } from 'react-native';

export default function MesazhiIm() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ky është komponenti im i parë!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  text: {
    color: '#065F46',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
