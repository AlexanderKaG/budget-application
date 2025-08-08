<script setup>
import { ref } from 'vue'
import CategorySelect from './CategorySelect.vue'
import { parseNumber } from '@/composables/parseLocalizedFloat'

const emit = defineEmits(['submit'])

const formItem = ref({
  name: '',
  price: '',
  paid: false,
  categoryId: '',
})

function handleSubmit() {
  const price = parseNumber(formItem.value.price)

  emit('submit', {
    name: formItem.value.name,
    price: price,
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
    <CategorySelect v-model="formItem.categoryId" />
    <button type="submit">Add</button>
  </form>
</template>
