<template>
  <v-container fluid>
    <v-row align="center" class="mb-8">
      <v-col>
        <h2>Manage your task</h2>
      </v-col>

      <v-col>
        <v-progress-linear
          v-model="progress.percentage"
          height="20"
          color="light-green-darken-1"
        >
          <strong>{{ progress.percentage }}%</strong>
          <span class="text-caption ml-1">
            ({{ progress.completed }} done out of {{ progress.total }})
          </span>
        </v-progress-linear>
      </v-col>
    </v-row>
    <task-action />
  </v-container>

  <v-container fluid class="px-0 fill-height">
    <v-row class="lists">
      <v-col cols="12" md="4" class="pa-4 px-md-8 bg-lime-accent-2">
        <task-list
          :key="key"
          title="Pending"
          status="pending"
          :list="pendingTasks"
          :state="tasksStore.state.pending"
        />
      </v-col>

      <v-col cols="12" md="4" class="pa-4 px-md-8 bg-cyan-lighten-1">
        <task-list
          :key="key"
          title="Processing"
          status="processing"
          :list="processingTasks"
          :state="tasksStore.state.processing"
        />
      </v-col>

      <v-col cols="12" md="4" class="pa-4 px-md-8 bg-teal-lighten-3">
        <task-list
          :key="key"
          title="Done"
          status="completed"
          :list="completedTasks"
          :state="tasksStore.state.completed"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue"
import { nanoid } from "nanoid"
import { useTasksStore } from "@/store/tasks"
import { useSearchParams } from "@/composables/useSearchParams"
import TaskList from "@/components/TaskList.vue"
import TaskAction from "@/components/TaskAction.vue"

const tasksStore = useTasksStore()
const { from, to } = useSearchParams()
const key = ref(nanoid(5))

function updateKey() {
  key.value = nanoid(5)
}

// Reset the key when the date range changes.
// This will force the component to re-render.
watch([from, to], updateKey)
tasksStore.$subscribe(updateKey)

const pendingTasks = computed(() => tasksStore.getPendingTasks())
const processingTasks = computed(() => tasksStore.getProcessingTasks())
const completedTasks = computed(() => tasksStore.getCompletedTasks())

const progress = computed(() => tasksStore.getProgressStats())
</script>

<style scoped>
.lists {
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  margin-top: 0;
  height: 100%;
  margin: 0;
}

.lists {
  margin-top: 0;
  height: 100%;
}

@media (min-width: 960px) {
  .lists > *:not(:last-child) {
    border-right: 2px solid #000;
  }
}
</style>
