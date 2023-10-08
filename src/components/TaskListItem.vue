<template>
  <v-card
    variant="outlined"
    flat
    :class="['card', data.isHighlighted && 'highlighted']"
    rounded="0"
  >
    <v-card-item class="card-item">
      <div class="d-flex align-center">
        <v-icon icon="mdi-drag" class="drag-handle" />
        <v-card-title class="text-body-2 pl-2 font-weight-medium">
          {{ data.title }}
        </v-card-title>
      </div>
    </v-card-item>

    <v-card-text class="pt-4 details">
      <task-list-item-detail label="Description">
        <div class="text-truncate">
          {{ data.description }}
        </div>
      </task-list-item-detail>

      <task-list-item-detail
        label="Labels"
        v-if="data.labels && data.labels.length > 0"
      >
        <task-list-item-label :labels="data.labels" />
      </task-list-item-detail>

      <task-list-item-detail label="Estimated Time" v-if="formattedDate">
        {{ formattedDate }}
      </task-list-item-detail>

      <task-list-item-detail label="Attachments" v-if="attachmentsCount">
        {{ attachmentsCount }}
      </task-list-item-detail>

      <task-list-item-detail label="Comment" v-if="data.comment">
        {{ data.comment }}
      </task-list-item-detail>

      <v-btn
        variant="outlined"
        rounded="0"
        size="x-small"
        :to="`/task/${data.id}`"
        class="mt-4"
      >
        View Details
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useDate } from "vuetify/labs/date"
import { Task } from "@/types/tasks"

import TaskListItemDetail from "@/components/TaskListItemDetail.vue"
import TaskListItemLabel from "@/components/TaskListItemLabel.vue"

const { data } = defineProps<{
  data: Task
}>()

const date = useDate()
const formattedDate = computed(() => {
  if (!data.estimatedDate) return null
  return date.format(new Date(data.estimatedDate), "fullDateTime24h")
})
const attachmentsCount = computed(() => {
  if (!data.attachments) return 0
  return data.attachments.length
})
</script>

<style scoped>
.card {
  background: #fff;
  border: 2px solid #000;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.card-item {
  background: #e5e7eb;
  padding: 8px;
  border-bottom: 2px solid #000;
}

.drag-handle {
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.card.highlighted {
  position: relative;
  transform: translate(5px, -5px);
  z-index: 1;
  box-shadow: -5px 5px #000;
}

.details > *:not(:last-child) {
  margin-bottom: 8px;
}
</style>
