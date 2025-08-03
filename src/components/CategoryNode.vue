<script setup>
import { computed, ref } from 'vue'
import CategoryNode from './CategoryNode.vue'
import EditableItem from './EditableItem.vue'

const emit = defineEmits(['updateItem'])

const props = defineProps({
  masterList: Array,
  categories: Array,
  category: Object,
  h2Level: Number,
})

const thisLevelItems = computed(() => {
  return props.masterList.filter((item) => item.categoryId === props.category.id)
})

const subcategories = computed(() => {
  return props.categories.filter((subcat) => subcat.parentId === props.category.id)
})

const spent = computed(() => {
  function gatherCategoryIds(id) {
    const children = props.categories.filter((categories) => categories.parentId === id)
    return [id, ...children.flatMap((child) => gatherCategoryIds(child.id))]
  }

  const categoryIds = gatherCategoryIds(props.category.id)

  return props.masterList
    .filter((item) => categoryIds.includes(item.categoryId))
    .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0)
})

const editingId = ref(null)

function updateTheItem(editedItem) {
  console.log('updated item')
  emit('updateItem', { ...editedItem })
  resetEditingId()
  console.log('finished updating item')
}

function cancelUpdate() {
  resetEditingId()
}

function resetEditingId() {
  editingId.value = null
}
</script>

<template>
  <div class="category-box">
    <div>
      <component :is="'h' + props.h2Level">
        <div class="category-header">
          <span class="category-name">{{ category.name }}</span>
          <span class="category-target">{{ category.target != null ? category.target : '–' }}</span>
          <span class="category-spent" v-if="spent > 0">{{ spent.toFixed(2) }}</span>
          <span class="category-spent" v-else>0.00</span>
        </div>
      </component>
    </div>

    <ul>
      <li v-for="item in thisLevelItems" :key="item.id" @click="editingId = item.id">
        <template v-if="editingId === item.id">
          <EditableItem
            :item="item"
            :categories="categories"
            @save="updateTheItem"
            @cancel="cancelUpdate"
          />
        </template>
        <template v-else>
          <span>{{ item.name }}</span>
          <span>{{ item.price }}</span>
        </template>
      </li>
    </ul>

    <div v-if="subcategories.length" class="subcategory-row">
      <CategoryNode
        v-for="sub in subcategories"
        :key="sub.id"
        :masterList="masterList"
        :categories="categories"
        :category="sub"
        :h2Level="props.h2Level + 1"
        @updateItem="emit('updateItem', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.category-box {
  flex: 1 1 250px;
  background-color: #ecf0f1;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #dcdde1;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.category-heading {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.target {
  color: #718093;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.subcategory-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.category-name {
  flex: 1;
  text-align: left;
}

.category-target {
  flex: 1;
  text-align: center;
}

.category-spent {
  flex: 1;
  text-align: right;
}
</style>
