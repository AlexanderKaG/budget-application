import { useLocalStorage } from './useLocalStorage'

const categories = useLocalStorage('categories', [])

export function useCategories() {
  return { categories }
}
