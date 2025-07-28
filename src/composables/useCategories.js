import { useLocalStorage } from './useLocalStorage'

const categories = useLocalStorage('categories', [
  { id: crypto.randomUUID(), name: 'Fasta', target: 51122, items: [], subcategories: [] },
  {
    id: crypto.randomUUID(),
    name: 'Mat',
    target: 8000,
    items: [
      {
        id: crypto.randomUUID(),
        name: 'Willys',
        amount: 5000,
        purchased: false,
      },
    ],
    subcategories: [
      {
        id: crypto.randomUUID(),
        name: 'Take Away',
        target: 1000,
        items: [
          {
            id: crypto.randomUUID(),
            name: 'Pizza',
            amount: 125,
            purchased: false,
          },
          {
            id: crypto.randomUUID(),
            name: 'Sushi',
            amount: 175,
            purchased: false,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: 'Snacks',
        target: 1000,
        items: [
          {
            id: crypto.randomUUID(),
            name: 'Marabou',
            amount: 35,
            purchased: false,
          },
          {
            id: crypto.randomUUID(),
            name: 'Glass',
            amount: 55,
            purchased: false,
          },
        ],
      },
    ],
  },
  { id: crypto.randomUUID(), name: 'Hushåll', target: 500, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Bensin', target: 2500, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Parkering', target: 750, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Aktiviteter', target: 968, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Klippning', target: 620, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Alex', target: 2000, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Julia', target: 2000, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Simon', target: 500, items: [], subcategories: [] },
  { id: crypto.randomUUID(), name: 'Lägenheten', target: 1000, items: [], subcategories: [] },
])

export function useCategories() {
  return { categories }
}
