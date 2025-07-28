<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
  category: Object,
})

const formItem = ref({
  name: '',
  amount: '',
  subcategory: '',
})

function handleSubmit() {
  const amount = parseFloat(formItem.value.amount.toString().replace(',', '.'))

  emit('submit', {
    name: formItem.value.name,
    amount: isNaN(amount) ? null : amount,
    subcategory: formItem.value.subcategory.trim(),
    category: props.category, // this is the top-level category node
  })

  formItem.value.name = ''
  formItem.value.amount = ''
  formItem.value.subcategory = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Name" required />
    <input v-model="formItem.amount" type="text" placeholder="Amount" required />
    <input v-model="formItem.subcategory" placeholder="Optional subcategory" />
    <button type="submit">Add</button>
  </form>
</template>
