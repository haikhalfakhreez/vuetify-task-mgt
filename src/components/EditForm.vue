<template>
  <form @submit.prevent="onSubmit" class="form">
    <v-text-field
      variant="outlined"
      rounded="0"
      v-bind="title"
      label="Title"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      rounded="0"
      v-bind="description"
      label="Description"
    ></v-text-field>

    <v-text-field
      variant="outlined"
      rounded="0"
      v-bind="estimatedDate"
      label="Estimated Time"
      type="datetime-local"
    ></v-text-field>

    <v-select
      variant="outlined"
      rounded="0"
      v-bind="statuses"
      label="Status"
      :items="TASK_STATUS"
    ></v-select>

    <v-combobox
      variant="outlined"
      rounded="0"
      v-bind="labels"
      label="Labels"
      multiple
      chips
      messages="Add labels to your task"
      hint="Press enter to add a label"
    ></v-combobox>

    <uploaded-files-viewer
      title="Uploaded Files"
      v-if="allAttachments && allAttachments.length > 0"
      :files="allAttachments"
      @on-file-remove="handleFileRemove"
    />

    <v-file-input
      variant="outlined"
      rounded="0"
      v-bind="attachments"
      label="Attachment(s)"
      counter
      multiple
      placeholder="Select your files"
      prepend-icon="mdi-paperclip"
      :show-size="1000"
    >
      <template v-slot:selection="{ fileNames }">
        <template v-for="fileName in fileNames" :key="fileName">
          <v-chip color="deep-purple-accent-4" label size="small" class="me-2">
            {{ fileName }}
          </v-chip>
        </template>
      </template>
    </v-file-input>

    <v-textarea
      label="Comment"
      variant="outlined"
      rounded="0"
      v-bind="comment"
    ></v-textarea>

    <v-row class="mt-8">
      <v-col cols="12" md="auto">
        <task-delete-dialog @on-delete="handleDelete" />
      </v-col>

      <v-spacer />

      <v-col cols="12" md="auto">
        <slot name="close"></slot>
      </v-col>

      <v-col cols="12" md="auto">
        <v-btn color="primary" rounded="0" type="submit" block> Update </v-btn>
      </v-col>
    </v-row>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { TASK_STATUS } from "@/lib/constants"
import { convertFile, convertDateToDatetimeLocal } from "@/lib/utils"
import { useTasksStore } from "@/store/tasks"
import { ToastConfig } from "@/types/toast"
import { Task, TaskStatus } from "@/types/tasks"
import { editSchema } from "@/lib/schema/tasks"

import UploadedFilesViewer from "@/components/UploadedFilesViewer.vue"
import TaskDeleteDialog from "@/components/TaskDeleteDialog.vue"

const props = defineProps<{
  data: Task
  status: TaskStatus
}>()

const emit = defineEmits<{
  (e: "submit", action: "update" | "delete"): void
}>()

const schema = toTypedSchema(editSchema)

const { values, setFieldValue, defineComponentBinds, handleSubmit, resetForm } =
  useForm({
    validationSchema: schema,
    initialValues: {
      title: props.data.title,
      description: props.data.description,
      estimatedDate: convertDateToDatetimeLocal(props.data.estimatedDate),
      status: props.status,
      labels: props.data.labels,
      comment: props.data.comment,
    },
  })

const validationConfig = (state: any) => ({
  props: {
    "error-messages": state.errors,
  },
})

const title = defineComponentBinds("title", validationConfig)
const description = defineComponentBinds("description", validationConfig)
const estimatedDate = defineComponentBinds("estimatedDate", validationConfig)
const statuses = defineComponentBinds("status", validationConfig)
const labels = defineComponentBinds("labels", validationConfig)
const attachments = defineComponentBinds("attachments", validationConfig)
const comment = defineComponentBinds("comment", validationConfig)

const localAttachments = ref(props.data.attachments)
const allAttachments = computed({
  get: () => [...(localAttachments.value ?? []), ...(values.attachments ?? [])],
  set: value => value,
})

const tasksStore = useTasksStore()

const toastConfig = ref<ToastConfig>({
  show: false,
  message: "",
  variant: "default",
})

const onSubmit = handleSubmit(async values => {
  const files = []

  if (values.attachments) {
    for (const file of values.attachments) {
      try {
        const convertedFile = await convertFile(file)
        files.push(convertedFile)
      } catch (error) {
        if (error instanceof Error) {
          toastConfig.value = {
            show: true,
            message: error.message,
            variant: "error",
          }
        }

        return
      }
    }
  }

  const payload = {
    ...props.data,
    title: values.title,
    description: values.description,
    estimatedDate: new Date(values.estimatedDate),
    attachments: [...(localAttachments.value ?? []), ...files],
    labels: values.labels,
    comment: values.comment,
  }

  if (props.status !== values.status) {
    tasksStore.deleteTaskById(props.data.id)
  }

  tasksStore.update(values.status, payload)

  resetForm()
  emit("submit", "update")
})

function handleFileRemove(index: number) {
  if (localAttachments.value && index < localAttachments.value.length) {
    localAttachments.value = localAttachments.value.filter(
      (_, i) => i !== index,
    )
  } else {
    if (values.attachments) {
      setFieldValue(
        "attachments",
        values.attachments.filter((_, i) => i !== index),
      )
    }
  }
}

function handleDelete() {
  tasksStore.deleteTaskById(props.data.id)
  emit("submit", "delete")
}
</script>

<style scoped>
.form > *:not(:last-child) {
  margin-bottom: 16px;
}
</style>
