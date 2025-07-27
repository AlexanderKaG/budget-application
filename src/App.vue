<script setup>
import { useCategories } from '@/composables/useCategories'
import { useAddCategory } from '@/composables/useAddCategory'
import BudgetCategory from '@/components/BudgetCategory.vue'
import AddCategoryForm from './components/AddCategoryForm.vue'
const { categories } = useCategories()
const { addCategory } = useAddCategory()
</script>

<template>
  <AddCategoryForm @submit="addCategory" />

  <BudgetCategory v-for="category in categories" :key="category.id" :category="category" />
</template>

<style scoped></style>
