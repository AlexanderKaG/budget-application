<script setup>
import { computed } from 'vue'
import CategoryNode from './CategoryNode.vue'

const props = defineProps({ masterList: Array, categories: Array, category: Object })

const thisLevelItems = computed(() => {
  return props.masterList.filter((item) => item.categoryId === props.category.id)
})

const subcategories = computed(() => {
  return props.categories.filter((subcat) => subcat.parentId === props.category.id)
})
</script>

<template>
  <div>
    <div>
      <h2>
        <span>
          {{ category.name }}
        </span>
        <span>
          {{ category.target }}
        </span>
      </h2>
    </div>

    <ul>
      <li v-for="item in thisLevelItems" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.price }}</span>
      </li>
    </ul>
  </div>

  <CategoryNode
    v-for="sub in subcategories"
    :key="sub.id"
    :masterList="masterList"
    :categories="categories"
    :category="sub"
  />
</template>
