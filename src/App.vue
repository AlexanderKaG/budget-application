<script setup>
import { computed } from 'vue'
import { useMasterList } from '@/composables/useMasterList'
import { useCategories } from '@/composables/useCategories'
import { useAddItem } from '@/composables/useAddItem'
import EntryForm from '@/components/EntryForm.vue'

const { masterList } = useMasterList()
const { categories } = useCategories()
const { addItem } = useAddItem()

const categorized = computed(() => {
  const grouped = {}
  const uncategorized = []

  masterList.value.forEach((item) => {
    if (item.category) {
      if (!grouped[item.category]) grouped[item.category] = []
      grouped[item.category].push(item)
    } else {
      uncategorized.push(item)
    }
  })

  return { grouped, uncategorized }
})

const categorySummaries = computed(() => {
  return categories.value.map((category) => {
    const items = categorized.value.grouped[category.name] || []
    const sum = items.reduce((acc, item) => acc + item.amount, 0)
    const isOverTarget = category.target >= 0 ? sum >= category.target : sum <= category.target

    return {
      name: category.name,
      items,
      sum,
      target: category.target,
      status: isOverTarget ? 'green' : 'red',
    }
  })
})

function updateCategory(item) {
  const newCategory = item._tempCategory?.trim() || ''
  item.category = newCategory
  delete item._tempCategory
}
</script>

<template>
  <EntryForm @submit="addItem" />

  <!-- Flex container for all category lists -->
  <div class="category-columns">
    <!-- Uncategorized FIRST -->
    <div class="category">
      <h3>Uncategorized</h3>
      <ul>
        <li v-for="item in categorized.uncategorized" :key="item.id">
          {{ item.name }} - {{ item.amount }}
          <input
            :value="item.category"
            @input="(e) => (item._tempCategory = e.target.value)"
            @blur="updateCategory(item)"
            @keyup.enter="updateCategory(item)"
            placeholder="Enter category"
          />
        </li>
      </ul>
    </div>

    <!-- Then categorized groups -->
    <div v-for="category in categorySummaries" :key="category.name" class="category">
      <h3>
        {{ category.name }} |
        <span> {{ category.sum }} / {{ category.target }} </span>
      </h3>
      <ul>
        <li v-for="item in category.items" :key="item.id">
          {{ item.name }} - {{ item.amount }}
          <input
            :value="item.category"
            @input="(e) => (item._tempCategory = e.target.value)"
            @blur="updateCategory(item)"
            @keyup.enter="updateCategory(item)"
            placeholder="Edit category"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
