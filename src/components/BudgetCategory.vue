<script setup>
import { useMasterList } from '@/composables/useMasterList'
import { computed } from 'vue'
import EntryForm from './EntryForm.vue'
import { useAddItem } from '@/composables/useAddItem'

const { masterList } = useMasterList()
const { addItem } = useAddItem()

const props = defineProps({
  category: Object,
})

const categorizedItems = computed(() =>
  masterList.value.filter((item) => item.category === props.category.name),
)

const spent = computed(() => categorizedItems.value.reduce((total, item) => total + item.amount, 0))
</script>

<template>
  <div>
    <EntryForm :category="category" @submit="addItem" />
    <h2>
      <div>
        {{ category.name }}
      </div>
      <div>
        {{ category.target }}
      </div>
      <div>
        {{ spent }}
      </div>
    </h2>
    <ul>
      <li v-for="item in categorizedItems" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.amount }}</span>
      </li>
    </ul>
  </div>
</template>
