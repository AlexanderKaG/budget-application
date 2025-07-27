<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const formItem = ref({
  name: '',
  target: '',
})

function handleSubmit() {
  const rawAmount = parseFloat(formItem.value.target.toString().replace(',', '.'))
  const parsedAmount = parseFloat(rawAmount)

  emit('submit', {
    ...formItem.value,
    target: isNaN(parsedAmount) ? null : parsedAmount,
  })

  // Reset form
  formItem.value.name = ''
  formItem.value.target = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Category name" required />
    <input v-model="formItem.target" type="text" placeholder="Target amount" required />
    <button type="submit">Add Item</button>
  </form>
</template>
