// src/composables/useDeleteCategory.js
import { useCategories } from './useCategories'
import { useMasterList } from './useMasterList'

export function useDeleteCategory() {
  const { categories } = useCategories()
  const { masterList } = useMasterList()

  function deleteCategory(categoryName) {
    if (!categoryName) return

    // Remove the category
    categories.value = categories.value.filter((c) => c.name !== categoryName)

    // Remove all items with that category from the master list
    masterList.value = masterList.value.filter((item) => item.category !== categoryName)
  }

  return {
    deleteCategory,
  }
}
