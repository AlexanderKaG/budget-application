<script setup>
import { ref } from 'vue'
import CategorySelect from './CategorySelect.vue'

const emit = defineEmits(['submit'])

const formItem = ref({
  name: '',
  target: '',
  parentId: '',
})

function handleSubmit() {
  const rawAmount = parseFloat(formItem.value.target.toString().replace(',', '.'))

  emit('submit', {
    ...formItem.value,
    target: isNaN(rawAmount) ? null : rawAmount,
    parentId: formItem.value.parentId || null,
  })

  // Reset form
  formItem.value.name = ''
  formItem.value.target = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Category name" required />
    <input v-model="formItem.target" type="text" placeholder="Target amount" />
    <CategorySelect v-model="formItem.parentId" />
    <button type="submit">Add Category</button>
  </form>
</template>
