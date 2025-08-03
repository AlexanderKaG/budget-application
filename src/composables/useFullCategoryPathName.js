import { useCategories } from './useCategories'

export function getFullCategoryPathName(categoryId) {
  const { categories } = useCategories()

  const buildName = (id) => {
    const category = categories.value.find((c) => c.id === id)
    if (!category) return ''
    const parentName = category.parentId ? buildName(category.parentId) + ':' : ''
    return parentName + category.name
  }

  return buildName(categoryId)
}
