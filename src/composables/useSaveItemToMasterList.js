import { useMasterList } from './useMasterList'

export function useSaveItemToMasterList() {
  const { masterList } = useMasterList()

  function saveItemToMasterList(item) {
    console.log('saving updated item to master list')
    const updated = [...masterList.value]
    const index = updated.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      updated[index] = { ...item }
      masterList.value = updated
    }
    console.log('finished saving to master list')
  }

  return {
    saveItemToMasterList,
  }
}
