import { useCategories } from './useCategories'
import { useMasterList } from './useMasterList'

export function useDeleteCategory() {
  const { categories } = useCategories()
  const { masterList } = useMasterList()

  function deleteCategory(categoryToDelete) {
    const idsToDelete = gatherCategoryIds(categoryToDelete.id)

    categories.value = categories.value.filter((cat) => !idsToDelete.includes(cat.id))

    masterList.value = masterList.value.map((item) =>
      idsToDelete.includes(item.categoryId) ? { ...item, categoryId: null } : item,
    )
  }

  function gatherCategoryIds(parentId) {
    const children = categories.value.filter((cat) => cat.parentId === parentId)
    return [parentId, ...children.flatMap((child) => gatherCategoryIds(child.id))]
  }

  return {
    deleteCategory,
  }
}
