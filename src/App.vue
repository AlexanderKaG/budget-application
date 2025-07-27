<script setup>
import { useCategories } from '@/composables/useCategories'
import { useAddItem } from '@/composables/useAddItem'
import EntryForm from '@/components/EntryForm.vue'
import BudgetCategory from '@/components/BudgetCategory.vue'
const { categories } = useCategories()
const { addItem } = useAddItem()
</script>

<template>
  <EntryForm @submit="addItem" />

  <BudgetCategory v-for="category in categories" :key="category.name" :category="category" />
</template>

<style scoped></style>
