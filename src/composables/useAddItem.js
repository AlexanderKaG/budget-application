export function useAddItem() {
  function addItem({ category, name, amount, subcategory }) {
    if (!category || !name || amount === null) return

    const item = {
      id: crypto.randomUUID(),
      name,
      amount: Number(amount),
      purchased: false,
    }

    if (!subcategory) {
      // Add directly to top-level category
      if (!category.items) category.items = []
      category.items.push(item)
    } else {
      // Normalize
      const subName = subcategory.trim()
      if (!category.subcategories) category.subcategories = []

      let sub = category.subcategories.find((s) => s.name === subName)

      if (!sub) {
        // Create subcategory
        sub = {
          id: crypto.randomUUID(),
          name: subName,
          target: 0,
          items: [],
          subcategories: [],
        }
        category.subcategories.push(sub)
      }

      if (!sub.items) sub.items = []
      sub.items.push(item)
    }
  }

  return {
    addItem,
  }
}
