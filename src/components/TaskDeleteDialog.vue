<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        variant="tonal"
        color="red-darken-4"
        rounded="0"
        prepend-icon="mdi-trash-can"
        block
        v-bind="props"
      >
        Delete
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-body-1 font-weight-semibold">
        Delete Task
      </v-card-title>

      <v-card-text class="text-body-2">
        <div>Are you sure you want to delete this task?</div>
        <div
          >Task ID: <code>{{ taskId }}</code></div
        >
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green-darken-1"
          rounded="0"
          variant="text"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          variant="tonal"
          color="red-darken-4"
          rounded="0"
          @click="handleDelete"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"

const emit = defineEmits<{
  (e: "on-delete", id: string): void
}>()

const dialog = ref(false)

const route = useRoute()
const taskId = route.params.id as string

function handleDelete() {
  emit("on-delete", taskId)
  dialog.value = false
}
</script>
