import { useCategories } from './useCategories'

export function useSaveCategoryToCategories() {
  const { categories } = useCategories()

  function saveCategoryToCategories(category) {
    const updated = [...categories.value]
    const index = updated.findIndex((i) => i.id === category.id)
    if (index !== -1) {
      updated[index] = { ...category }
      categories.value = updated
    }
  }

  return {
    saveCategoryToCategories,
  }
}
