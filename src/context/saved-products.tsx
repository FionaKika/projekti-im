import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type SavedProductsContextValue = { savedIds: string[]; toggleSaved: (id: string) => void; isSaved: (id: string) => boolean };
const SavedProductsContext = createContext<SavedProductsContextValue | null>(null);

export function SavedProductsProvider({ children }: PropsWithChildren) {
  const [savedIds, setSavedIds] = useState<string[]>(['coffee', 'olive-oil']);
  const value = useMemo(() => ({
    savedIds,
    toggleSaved: (id: string) => setSavedIds((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]),
    isSaved: (id: string) => savedIds.includes(id),
  }), [savedIds]);
  return <SavedProductsContext.Provider value={value}>{children}</SavedProductsContext.Provider>;
}

export function useSavedProducts() {
  const context = useContext(SavedProductsContext);
  if (!context) throw new Error('useSavedProducts must be used inside SavedProductsProvider');
  return context;
}
