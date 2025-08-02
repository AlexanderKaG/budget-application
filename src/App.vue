<script setup>
import { useCategories } from './composables/useCategories'
import { useAddCategory } from './composables/useAddCategory'
import AddCategoryForm from './components/AddCategoryForm.vue'

const { categories } = useCategories()
const { addCategory } = useAddCategory()
</script>

<template>
  <AddCategoryForm :categories="categories" @submit="addCategory" />
</template>

<style scoped></style>
