
import { Stack } from 'expo-router';
import { SavedProductsProvider } from '../context/saved-products';
import { ProductsProvider } from '../context/products';

export default function RootLayout() {
  return (
    <ProductsProvider>
      <SavedProductsProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F6F7F2' } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="report/[id]" options={{ presentation: 'modal' }} />
        </Stack>
      </SavedProductsProvider>
    </ProductsProvider>
  );
}
