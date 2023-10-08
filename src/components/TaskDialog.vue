<template>
  <v-dialog
    width="500"
    :model-value="dialog"
    @update:modelValue="handleDialogClose"
    v-if="task && status"
  >
    <template v-slot:default="{ isActive }">
      <v-sheet title="Edit Task">
        <v-container>
          <div class="text-h6 font-weight-semibold mb-8">Edit Task</div>

          <edit-form
            :data="task"
            :status="status"
            @submit="onSubmit"
            :key="key"
          >
            <template #close>
              <v-btn
                text="Close"
                @click="isActive.value = false"
                variant="outlined"
                rounded="0"
                block
              >
                Close
              </v-btn>
            </template>
          </edit-form>
        </v-container>
      </v-sheet>
    </template>
  </v-dialog>

  <v-toast v-model="toastConfig.show" :config="toastConfig" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { nanoid } from "nanoid"
import { useTasksStore } from "@/store/tasks"
import { ToastConfig } from "@/types/toast"

import EditForm from "@/components/EditForm.vue"
import VToast from "@/components/VToast.vue"

const key = ref(nanoid(5))
const dialog = ref(true)
const route = useRoute()
const router = useRouter()
const taskId = route.params.id as string

const tasksStore = useTasksStore()

const task = computed(() => {
  return tasksStore.getTaskById(taskId)
})

const status = computed(() => {
  return tasksStore.getStatusById(taskId)
})

function handleDialogClose() {
  router.push("/tasks")
}

const toastConfig = ref<ToastConfig>({
  show: false,
  message: "",
  variant: "default",
})

function onSubmit(action: "update" | "delete") {
  if (action === "update") {
    key.value = nanoid(5)
    toastConfig.value = {
      show: true,
      message: `Task id: ${taskId} has been updated`,
      variant: "success",
    }
  } else {
    router.replace("/tasks")
  }
}
</script>

<style scoped>
.details > *:not(:last-child) {
  margin-bottom: 8px;
}
</style>
