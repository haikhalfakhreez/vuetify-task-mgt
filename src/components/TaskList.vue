<template>
  <v-row no-gutters align="center" class="mb-2">
    <h3>{{ title }}</h3>
    <v-spacer />

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn variant="text" icon="mdi-sort" size="small" v-bind="props" />
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in SORT_BY"
          :key="index"
          :value="index"
          @click="handleSort(item)"
        >
          <v-list-item-title>by {{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>

  <v-col class="lists">
    <draggable
      :list="internalList"
      item-key="id"
      handle=".drag-handle"
      class="lists-container"
      group="tasks"
      @change="handleChange"
    >
      <template #item="{ element }">
        <task-list-item :data="element" />
      </template>
    </draggable>
  </v-col>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import draggable from "vuedraggable"
import { Task, TaskStatus, SortTaskBy } from "@/types/tasks"
import { DragChangeEvent } from "@/types/draggable"
import { useTasksStore } from "@/store/tasks"
import { SORT_BY } from "@/lib/constants"

import TaskListItem from "./TaskListItem.vue"

const { list, state, status, title } = defineProps<{
  /**
   * Filtered list of tasks.
   */
  list: Task[]
  /**
   * The real tasks source of truth.
   */
  state: Task[]
  /**
   * The status of the task list.
   */
  status: TaskStatus
  /**
   * String to display as label.
   */
  title: string
}>()

const tasksStore = useTasksStore()
const internalList = ref(list)

const handleChange = (event: DragChangeEvent) => {
  if (event.added) {
    const task = event.added.element
    const index = event.added.newIndex
    const newState = [...state.slice(0, index), task, ...state.slice(index)]
    tasksStore.updateAll(status, newState)
  }

  if (event.removed) {
    const index = event.removed.oldIndex
    const newState = [...state.slice(0, index), ...state.slice(index + 1)]
    tasksStore.updateAll(status, newState)
  }

  if (event.moved) {
    const listIds = internalList.value.map(t => t.id)
    const stateWithoutList = state.filter(t => !listIds.includes(t.id))
    const finalState = [...internalList.value, ...stateWithoutList]
    tasksStore.updateAll(status, finalState)
  }
}

const sort = ref()

function handleSort(value: SortTaskBy) {
  sort.value = value
  tasksStore.sortTaskBy(status, value)
}
</script>

<style scoped>
.lists {
  padding: 0px;
  height: 100%;
}

.lists-container {
  height: 100%;
}

.lists-container > *:not(:last-child) {
  margin-bottom: 16px;
}
</style>
