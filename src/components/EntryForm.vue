<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const formItem = ref({
  name: '',
  amount: null,
  category: '',
})

function handleSubmit() {
  emit('submit', { ...formItem.value })

  // Reset form
  formItem.value = { name: '', amount: null, category: '' }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Name" required />
    <input v-model.number="formItem.amount" type="number" placeholder="Amount" required />
    <input v-model="formItem.category" placeholder="Category (optional)" />
    <button type="submit">Add Item</button>
  </form>
</template>
