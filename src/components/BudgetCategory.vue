<script setup>
import { useMasterList } from '@/composables/useMasterList'
import { useDeleteCategory } from '@/composables/useDeleteCategory'
import { computed } from 'vue'
import EntryForm from './EntryForm.vue'
import { useAddItem } from '@/composables/useAddItem'

const { masterList } = useMasterList()
const { addItem } = useAddItem()
const { deleteCategory } = useDeleteCategory()

const props = defineProps({
  category: Object,
})

function handleDelete() {
  if (
    confirm(`Are you sure you want to delete category "${props.category.name}" and all its items?`)
  ) {
    deleteCategory(props.category.name)
  }
}

const categorizedItems = computed(() =>
  masterList.value.filter((item) => item.category === props.category.name),
)

const spent = computed(() =>
  categorizedItems.value
    .filter((item) => item.purchased)
    .reduce((total, item) => total + item.amount, 0),
)
</script>

<template>
  <div>
    <EntryForm :category="category" @submit="addItem" />
    <button @click="handleDelete">Delete Category</button>
    <h2>
      <div>
        {{ category.name }}
      </div>
      <div>
        {{ category.target }}
      </div>
      <div>
        {{ spent }}
      </div>
    </h2>
    <ul>
      <li v-for="item in categorizedItems" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.amount }}</span>
        <input type="checkbox" v-model="item.purchased" />
      </li>
    </ul>
  </div>
</template>
