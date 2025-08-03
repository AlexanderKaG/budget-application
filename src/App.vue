<script setup>
import { computed } from 'vue'
import { useCategories } from './composables/useCategories'
import { useAddCategory } from './composables/useAddCategory'
import AddCategoryForm from './components/AddCategoryForm.vue'
import { useMasterList } from './composables/useMasterList'
import { useAddItem } from './composables/useAddItem'
import EntryForm from './components/EntryForm.vue'
import CategoryNode from './components/CategoryNode.vue'
import { useSaveItemToMasterList } from './composables/useSaveItemToMasterList'
import { useSaveCategoryToCategories } from './composables/useSaveCategoryToCategories'

const { categories } = useCategories()
const { addCategory } = useAddCategory()

const { masterList } = useMasterList()
const { addItem } = useAddItem()
const { saveItemToMasterList } = useSaveItemToMasterList()
const { saveCategoryToCategories } = useSaveCategoryToCategories()

const topLevelCategories = computed(() => {
  return categories.value.filter((category) => !category.parentId)
})

const uncategorizedItems = computed(() => masterList.value.filter((item) => !item.categoryId))
</script>

<template>
  <AddCategoryForm :categories="categories" @submit="addCategory" />
  <EntryForm :categories="categories" @submit="addItem" />
  <section v-if="uncategorizedItems.length">
    <h2>Uncategorized</h2>
    <ul>
      <li v-for="item in uncategorizedItems" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.price }}</span>
      </li>
    </ul>
  </section>

  <div class="category-columns">
    <CategoryNode
      v-for="category in topLevelCategories"
      :key="category.id"
      :masterList="masterList"
      :categories="categories"
      :category="category"
      :h2Level="2"
      @updateItem="saveItemToMasterList"
      @updateCategory="saveCategoryToCategories"
    />
  </div>
</template>

<style>
/* Modern readable font */
body {
  font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
  background-color: #f5f6fa;
  color: #2f3640;
  padding: 2rem;
  margin: 0;
}

/* Form styling */
form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  background-color: #ffffff;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

input,
select {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #dcdde1;
  border-radius: 5px;
  background-color: #fff;
}

input[type='checkbox'] {
  margin-left: 0.5rem;
  transform: scale(1.1);
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background-color: #2980b9;
}

/* Headings */
h2,
h3,
h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

/* Item and category containers */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Section for uncategorized */
section {
  margin-top: 2rem;
}

.category-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>
