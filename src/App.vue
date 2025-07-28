<script setup>
import { useCategories } from '@/composables/useCategories'
import { useAddCategory } from '@/composables/useAddCategory'
import AddCategoryForm from './components/AddCategoryForm.vue'
import CategoryNode from '@/components/CategoryNode.vue'
const { categories } = useCategories()
const { addCategory } = useAddCategory()
</script>

<template>
  <AddCategoryForm @submit="addCategory" />

  <div class="categories-container">
    <CategoryNode
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :isRoot="true"
    />
  </div>
</template>

<style scoped>
.categories-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
