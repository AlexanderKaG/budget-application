import { useCategories } from './useCategories'

export function useAddCategory() {
  const { categories } = useCategories()

  function addCategory(category) {
    if (!category.name || category.target === null) return

    const exists = categories.value.some(
      (c) => c.name.toLowerCase() === category.name.trim().toLowerCase(),
    )
    if (exists) return

    categories.value.push({
      id: crypto.randomUUID(),
      name: category.name,
      target: Number(category.target),
      parentId: category.parentId,
    })
  }

  return {
    addCategory,
  }
}
