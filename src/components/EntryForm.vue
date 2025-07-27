<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const formItem = ref({
  name: '',
  amount: '',
  category: '',
})

function handleSubmit() {
  const rawAmount = parseFloat(formItem.value.amount.toString().replace(',', '.'))
  const parsedAmount = parseFloat(rawAmount)

  emit('submit', {
    ...formItem.value,
    amount: isNaN(parsedAmount) ? null : parsedAmount,
  })

  // Reset form
  formItem.value.name = ''
  formItem.value.amount = null
  formItem.value.category = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Name" required />
    <input v-model="formItem.amount" type="text" placeholder="Amount" required />
    <input v-model="formItem.category" placeholder="Category (optional)" />
    <button type="submit">Add Item</button>
  </form>
</template>
