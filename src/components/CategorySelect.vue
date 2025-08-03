<script setup>
import { computed } from 'vue'
import { useCategories } from '../composables/useCategories'
import { getFullCategoryPathName } from '@/composables/useFullCategoryPathName'

const props = defineProps({
  modelValue: [String, null],
  excludeId: [String, null],
})

const emit = defineEmits(['update:modelValue'])

const { categories } = useCategories()

const filteredCategories = computed(() => {
  return props.excludeId
    ? categories.value.filter((c) => c.id !== props.excludeId)
    : categories.value
})

function onChange(event) {
  const selectedValue = event.target.value || null
  emit('update:modelValue', selectedValue)
}
</script>

<template>
  <select :value="modelValue" @change="onChange">
    <option :value="null">Välj en kategori</option>
    <option v-for="category in filteredCategories" :key="category.id" :value="category.id">
      {{ getFullCategoryPathName(category.id) }}
    </option>
  </select>
</template>
