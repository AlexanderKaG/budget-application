<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
  category: Object,
})

const formItem = ref({
  name: '',
  amount: '',
})

function handleSubmit() {
  const rawAmount = parseFloat(formItem.value.amount.toString().replace(',', '.'))
  const parsedAmount = parseFloat(rawAmount)

  emit('submit', {
    name: formItem.value.name.trim(),
    amount: isNaN(parsedAmount) ? null : parsedAmount,
    category: props.category.name,
  })

  // Reset form
  formItem.value.name = ''
  formItem.value.amount = null
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Name" required />
    <input v-model="formItem.amount" type="text" placeholder="Amount" required />
    <button type="submit">Add Item</button>
  </form>
</template>
