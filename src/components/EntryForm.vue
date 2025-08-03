<script setup>
import { ref } from 'vue'
import { getFullCategoryPathName } from '@/composables/useFullCategoryPathName'

const emit = defineEmits(['submit'])
const props = defineProps({ categories: Array })

const formItem = ref({
  name: '',
  price: '',
  paid: false,
  categoryId: '',
})

function handleSubmit() {
  const price = parseFloat(formItem.value.price.toString().replace(',', '.'))

  emit('submit', {
    name: formItem.value.name,
    price: isNaN(price) ? null : price,
    paid: formItem.value.paid,
    categoryId: formItem.value.categoryId,
  })

  formItem.value.name = ''
  formItem.value.price = ''
  formItem.value.paid = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Expense" required />
    <input v-model="formItem.price" type="text" placeholder="Price" required />
    <label>
      Paid
      <input type="checkbox" v-model="formItem.paid" />
    </label>
    <select v-model="formItem.categoryId">
      <option :value="null">Välj en kategori</option>
      <option v-for="category in props.categories" :key="category.id" :value="category.id">
        {{ getFullCategoryPathName(category.parentId) }}{{ category.parentId ? ':' : ''
        }}{{ category.name }}
      </option>
    </select>

    <button type="submit">Add</button>
  </form>
</template>
