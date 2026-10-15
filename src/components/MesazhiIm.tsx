import { StyleSheet, Text, View } from 'react-native';

export default function MesazhiIm() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ky është komponenti im i parë në React Native!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#687B62',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});