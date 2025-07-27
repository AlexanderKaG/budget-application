import { useLocalStorage } from './useLocalStorage'

const categories = useLocalStorage('categories', [
  { id: crypto.randomUUID(), name: 'Fasta', target: 51122 },
  { id: crypto.randomUUID(), name: 'Mat', target: 8000 },
  { id: crypto.randomUUID(), name: 'Hushåll', target: 500 },
  { id: crypto.randomUUID(), name: 'Bensin', target: 2500 },
  { id: crypto.randomUUID(), name: 'Parkering', target: 750 },
  { id: crypto.randomUUID(), name: 'Aktiviteter', target: 968 },
  { id: crypto.randomUUID(), name: 'Klippning', target: 620 },
  { id: crypto.randomUUID(), name: 'Alex', target: 2000 },
  { id: crypto.randomUUID(), name: 'Julia', target: 2000 },
  { id: crypto.randomUUID(), name: 'Simon', target: 500 },
  { id: crypto.randomUUID(), name: 'Lägenheten', target: 1000 },
])

export function useCategories() {
  return { categories }
}
