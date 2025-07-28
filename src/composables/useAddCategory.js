import { useCategories } from './useCategories'

export function useAddCategory() {
  const { categories } = useCategories()

  function addCategory(item) {
    if (!item.name || item.target === null) return

    const exists = categories.value.some(
      (c) => c.name.toLowerCase() === item.name.trim().toLowerCase(),
    )
    if (exists) return

    categories.value.push({
      id: crypto.randomUUID(),
      name: item.name,
      target: Number(item.target),
      items: item.items,
      subcategories: item.subcategories,
    })
  }

  return {
    addCategory,
  }
}
