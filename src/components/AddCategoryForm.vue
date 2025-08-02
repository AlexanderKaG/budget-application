<script setup>
import { ref } from 'vue'

const props = defineProps({ categories: Array })
const emit = defineEmits(['submit'])

const formItem = ref({
  name: '',
  target: '',
  parentId: '',
})

function handleSubmit() {
  const rawAmount = parseFloat(formItem.value.target.toString().replace(',', '.'))
  const parsedAmount = parseFloat(rawAmount)

  emit('submit', {
    ...formItem.value,
    target: isNaN(parsedAmount) ? null : parsedAmount,
    parentId: formItem.value.parentId || null,
  })

  // Reset form
  formItem.value.name = ''
  formItem.value.target = ''
  formItem.value.parentId = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formItem.name" placeholder="Category name" required />
    <input v-model="formItem.target" type="text" placeholder="Target amount" required />
    <select v-model="formItem.parentId">
      <option :value="null">Välj en kategori</option>
      <option v-for="category in props.categories" :key="category.id" :value="category.id">
        {{ category.id }}:{{ category.name }}
      </option>
    </select>
    <button type="submit">Add Item</button>
  </form>
</template>
