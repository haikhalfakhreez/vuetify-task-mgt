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
      v-bind="status"
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
      v-if="values.attachments && values.attachments.length > 0"
      :files="attachments.modelValue ?? []"
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

    <v-row class="mt-8">
      <v-col cols="12" md="auto" class="px-0">
        <go-to-dashboard-button />
      </v-col>

      <v-spacer />

      <v-col cols="12" md="auto">
        <v-btn variant="outlined" rounded="0" @click="resetForm()" block>
          clear
        </v-btn>
      </v-col>

      <v-col cols="12" md="auto">
        <v-btn color="primary" rounded="0" type="submit" block> Submit </v-btn>
      </v-col>
    </v-row>
  </form>

  <v-toast v-model="toastConfig.show" :config="toastConfig" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { TASK_STATUS } from "@/lib/constants"
import { convertFile, nanoid } from "@/lib/utils"
import { useTasksStore } from "@/store/tasks"
import { ToastConfig } from "@/types/toast"
import { taskSchema } from "@/lib/schema/tasks"

import UploadedFilesViewer from "@/components/UploadedFilesViewer.vue"
import VToast from "@/components/VToast.vue"
import GoToDashboardButton from "@/components/GoToDashboardButton.vue"

const schema = toTypedSchema(taskSchema)

const { values, setFieldValue, defineComponentBinds, handleSubmit, resetForm } =
  useForm({
    validationSchema: schema,
  })

const validationConfig = (state: any) => ({
  props: {
    "error-messages": state.errors,
  },
})

const title = defineComponentBinds("title", validationConfig)
const description = defineComponentBinds("description", validationConfig)
const estimatedDate = defineComponentBinds("estimatedDate", validationConfig)
const status = defineComponentBinds("status", validationConfig)
const labels = defineComponentBinds("labels", validationConfig)
const attachments = defineComponentBinds("attachments", validationConfig)

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
    id: nanoid(),
    title: values.title,
    description: values.description,
    estimatedDate: new Date(values.estimatedDate),
    attachments: files,
    labels: values.labels,
    isHighlighted: false,
  }

  tasksStore.add(values.status, payload)

  toastConfig.value = {
    show: true,
    message: "Task created successfully!",
    variant: "success",
  }

  resetForm()
})

function handleFileRemove(index: number) {
  if (values.attachments) {
    setFieldValue(
      "attachments",
      values.attachments.filter((_, i) => i !== index),
    )
  }
}
</script>

<style scoped>
.form > *:not(:last-child) {
  margin-bottom: 16px;
}
</style>
