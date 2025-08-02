<script setup>
import { useCategories } from './composables/useCategories'
import { useAddCategory } from './composables/useAddCategory'
import AddCategoryForm from './components/AddCategoryForm.vue'
import { useAddItem } from './composables/useAddItem'
import EntryForm from './components/EntryForm.vue'

const { categories } = useCategories()
const { addCategory } = useAddCategory()

const { addItem } = useAddItem()
</script>

<template>
  <AddCategoryForm :categories="categories" @submit="addCategory" />
  <EntryForm :categories="categories" @submit="addItem" />
</template>

<style scoped></style>
