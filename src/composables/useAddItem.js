import { useMasterList } from './useMasterList'

export function useAddItem() {
  const { masterList } = useMasterList()

  function addItem(item) {
    if (!item.name || isNaN(item.price) || item.paid === null) return

    masterList.value.push({
      id: crypto.randomUUID(),
      name: item.name,
      price: Number(item.price),
      paid: item.paid,
      categoryId: item.categoryId,
    })
  }

  return {
    addItem,
  }
}
