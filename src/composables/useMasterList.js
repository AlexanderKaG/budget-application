import { useLocalStorage } from './useLocalStorage'

const masterList = useLocalStorage('masterList', [])

export function useMasterList() {
  return { masterList }
}
