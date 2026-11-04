import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette } from '../../design/tokens';

const icons = {
  index: { ios: 'house.fill', android: 'home', web: 'home' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  scan: { ios: 'barcode.viewfinder', android: 'qr_code_scanner', web: 'qr_code_scanner' },
  saved: { ios: 'heart.fill', android: 'favorite', web: 'favorite' },
  profile: { ios: 'person.crop.circle.fill', android: 'account_circle', web: 'account_circle' },
} as const;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const tabBarLift = 8;

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: palette.forest,
      tabBarInactiveTintColor: '#89958B',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#E7EBE3',
        height: 49 + insets.bottom + tabBarLift,
        paddingTop: 6,
        paddingBottom: insets.bottom + tabBarLift,
      },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Kryefaqja', tabBarIcon: ({ color }) => <SymbolView name={icons.index} tintColor={color} size={21} /> }} />
      <Tabs.Screen name="search" options={{ title: 'Kërko', tabBarIcon: ({ color }) => <SymbolView name={icons.search} tintColor={color} size={21} /> }} />
      <Tabs.Screen name="scan" options={{ title: 'Skano', tabBarIcon: ({ color }) => <SymbolView name={icons.scan} tintColor={color} size={23} /> }} />
      <Tabs.Screen name="saved" options={{ title: 'Të ruajtura', tabBarIcon: ({ color }) => <SymbolView name={icons.saved} tintColor={color} size={20} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profili', tabBarIcon: ({ color }) => <SymbolView name={icons.profile} tintColor={color} size={21} /> }} />
    </Tabs>
  );
}
