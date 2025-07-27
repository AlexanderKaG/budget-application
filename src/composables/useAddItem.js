// src/composables/useAddItem.js
import { useMasterList } from './useMasterList'
import { useCategories } from './useCategories'

export function useAddItem() {
  const { masterList } = useMasterList()
  const { categories } = useCategories()

  function addItem(item) {
    if (!item.name || item.amount === null) return

    const trimmedCategory = item.category?.trim()

    if (trimmedCategory) {
      const exists = categories.value.some((c) => c.name === trimmedCategory)
      if (!exists) {
        categories.value.push({
          id: crypto.randomUUID(),
          name: trimmedCategory,
          target: 0,
        })
      }
    }

    masterList.value.push({
      id: crypto.randomUUID(),
      name: item.name,
      amount: Number(item.amount),
      category: trimmedCategory || undefined,
      purchased: false,
    })
  }

  return {
    addItem,
  }
}
