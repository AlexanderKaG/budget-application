<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save', 'cancel'])

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
  const price = parseFloat(editedPrice.value.toString().replace(',', '.'))

  emit('save', {
    id: props.item.id,
    name: editedName.value,
    price: isNaN(price) ? null : price,
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
</script>

<template>
  <form @submit.prevent="save" @click.stop>
    <input v-model="editedName" />
    <input v-model="editedPrice" type="text" />
    <label>
      Paid
      <input type="checkbox" v-model="editedPaid" />
    </label>
    <select v-model="editedCategoryId">
      <option :value="null">Välj en kategori</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
    <button type="submit">💾</button>
    <button type="button" @click="cancel">❌</button>
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
