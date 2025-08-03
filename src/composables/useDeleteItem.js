import { useMasterList } from './useMasterList'

export function useDeleteItem() {
  const { masterList } = useMasterList()

  function deleteItem(item) {
    const index = masterList.value.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      masterList.value.splice(index, 1)
    }
  }

  return {
    deleteItem,
  }
}
