<script setup>
import { ref, computed } from 'vue'

const masterList = ref([
  { id: 1, name: 'Salary', amount: 3000, category: 'Income' },
  { id: 2, name: 'Groceries', amount: -200, category: 'Food' },
  { id: 3, name: 'Internet', amount: -100, category: 'Utilities' },
  { id: 4, name: 'Bonus', amount: 500, category: 'Income' },
  { id: 5, name: 'Bus ticket', amount: -30 }, // no category
])

const categories = ref([
  { name: 'Income', target: 2500 },
  { name: 'Food', target: -300 },
  { name: 'Utilities', target: -150 },
])

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
</script>

<template>
  <div v-for="category in categorySummaries" :key="category.name">
    <h3>
      {{ category.name }} -
      <span :style="{ color: category.status }"> {{ category.sum }} / {{ category.target }} </span>
    </h3>
    <ul>
      <li v-for="item in category.items" :key="item.id">{{ item.name }} - {{ item.amount }}</li>
    </ul>
  </div>

  <div>
    <h3>Uncategorized</h3>
    <ul>
      <li v-for="item in categorized.uncategorized" :key="item.id">
        {{ item.name }} - {{ item.amount }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
