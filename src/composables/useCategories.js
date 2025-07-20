import { useLocalStorage } from './useLocalStorage'

const categories = useLocalStorage('categories', [
  { name: 'Income', target: 2500 },
  { name: 'Food', target: -300 },
  { name: 'Utilities', target: -150 },
])

export function useCategories() {
  return { categories }
}
