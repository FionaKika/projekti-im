
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SavedProductsProvider } from '../context/saved-products';
import { ProductsProvider } from '../context/products';

export default function RootLayout() {
  return (
    <ProductsProvider>
      <SavedProductsProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F7F2' }} edges={['top']}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F6F7F2' } }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="product/[id]" options={{ presentation: 'card' }} />
            <Stack.Screen name="report/[id]" options={{ presentation: 'modal' }} />
          </Stack>
        </SafeAreaView>
      </SavedProductsProvider>
    </ProductsProvider>
  );
}
