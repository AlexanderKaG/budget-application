<script setup>
import { computed } from 'vue'
import { useCategories } from './composables/useCategories'
import { useAddCategory } from './composables/useAddCategory'
import AddCategoryForm from './components/AddCategoryForm.vue'
import { useMasterList } from './composables/useMasterList'
import { useAddItem } from './composables/useAddItem'
import EntryForm from './components/EntryForm.vue'
import CategoryNode from './components/CategoryNode.vue'

const { categories } = useCategories()
const { addCategory } = useAddCategory()

const { masterList } = useMasterList()
const { addItem } = useAddItem()

const topLevelCategories = computed(() => {
  return categories.value.filter((category) => !category.parentId)
})
</script>

<template>
  <AddCategoryForm :categories="categories" @submit="addCategory" />
  <EntryForm :categories="categories" @submit="addItem" />
  <CategoryNode
    v-for="category in topLevelCategories"
    :key="category.id"
    :masterList="masterList"
    :categories="categories"
    :category="category"
  />
</template>

<style scoped></style>
