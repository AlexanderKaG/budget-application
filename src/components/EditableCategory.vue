<script setup>
import { ref } from 'vue'
import CategorySelect from './CategorySelect.vue'

const emit = defineEmits(['save', 'cancel', 'delete'])

const props = defineProps({
  category: Object,
  categories: Array,
})

const editedName = ref(props.category.name)
const editedTarget = ref(props.category.target)
const editedParentId = ref(props.category.parentId)

function save() {
  const target = parseFloat(editedTarget.value.toString().replace(',', '.'))

  emit('save', {
    id: props.category.id,
    name: editedName.value,
    target: isNaN(target) ? null : target,
    parentId: editedParentId.value || null,
  })
}

function cancel() {
  emit('cancel')
}

function deleteCategory() {
  emit('delete', { ...props.category })
}
</script>

<template>
  <form @submit.prevent="save" @click.stop>
    <input v-model="editedName" placeholder="Category name" />
    <input v-model="editedTarget" type="number" placeholder="Budget target" />
    <CategorySelect v-model="editedParentId" :exclude-id="props.category.id" />
    <button type="submit">💾</button>
    <button type="button" @click="cancel">❌</button>
    <button type="button" @click="deleteCategory">🗑️</button>
  </form>
</template>
