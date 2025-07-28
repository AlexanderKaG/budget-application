<script setup>
import { computed } from 'vue'
import { useAddItem } from '@/composables/useAddItem'
import CategoryNode from '@/components/CategoryNode.vue'
import EntryForm from './EntryForm.vue'

const { addItem } = useAddItem()

const props = defineProps({ category: Object, isRoot: Boolean })

const isSubcategory = computed(() => {
  return props.isRoot !== true
})

const spent = computed(() => {
  const thisLevel = (props.category.items || [])
    .filter((item) => item.purchased)
    .reduce((sum, item) => sum + item.amount, 0)

  const children = (props.category.subcategories || []).map(
    (sub) => sub.items?.filter((i) => i.purchased).reduce((s, i) => s + i.amount, 0) || 0,
  )

  return thisLevel + children.reduce((a, b) => a + b, 0)
})
</script>

<template>
  <div>
    <EntryForm v-if="!isSubcategory" :category="category" @submit="addItem" />
    <div>
      <h2>
        <span>
          {{ category.name }}
        </span>
        <span>
          {{ category.target }}
        </span>
        <span>:{{ spent }} </span>
      </h2>
    </div>

    <ul>
      <li v-for="item in category.items" :key="item.id">
        <input type="checkbox" v-model="item.purchased" />
        <span>{{ item.name }}</span>
        <span>{{ item.amount }}</span>
      </li>
    </ul>

    <CategoryNode v-for="sub in category.subcategories" :key="sub.id" :category="sub" />
  </div>
</template>
