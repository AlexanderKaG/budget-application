<script setup>
import { ref } from 'vue'
import CategorySelect from './CategorySelect.vue'
import { parseNumber } from '@/composables/parseLocalizedFloat'

const emit = defineEmits(['save', 'cancel', 'delete'])

const props = defineProps({
  item: Object,
  categories: Array,
})

const editedName = ref(props.item.name)
const editedPrice = ref(props.item.price)
const editedPaid = ref(props.item.paid)
const editedCategoryId = ref(props.item.categoryId)

function save() {
  console.log('saved updated item')
  const price = parseNumber(editedPrice.value)

  emit('save', {
    id: props.item.id,
    name: editedName.value,
    price: price,
    paid: editedPaid.value,
    categoryId: editedCategoryId.value,
  })

  editedName.value = ''
  editedPrice.value = ''
  console.log('finished saving')
}

function cancel() {
  emit('cancel', null)
}

function deleteItem() {
  emit('delete', props.item)
}
</script>

<template>
  <form @submit.prevent="save" @click.stop>
    <input v-model="editedName" />
    <input v-model="editedPrice" type="text" />
    <label>
      Paid
      <input type="checkbox" v-model="editedPaid" />
    </label>
    <CategorySelect v-model="editedCategoryId" />
    <button type="submit">💾</button>
    <button type="button" @click="cancel">❌</button>
    <button type="button" @click="deleteItem">🗑️</button>
  </form>
</template>

<style scoped>
.edit-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.edit-item input,
.edit-item select {
  flex: 1;
}
</style>
