<template>
  <v-sheet>
    <div class="text-body-2 mb-4 font-weight-medium" v-if="title">
      {{ title }}
    </div>

    <v-card
      variant="outlined"
      rounded="0"
      flat
      v-for="(file, index) in files"
      :key="index"
      class="my-1"
    >
      <v-row align="stretch">
        <v-col cols="12" md="auto">
          <v-card-title>
            <v-icon class="me-2" size="x-small">mdi-paperclip</v-icon>
            <span class="text-caption">
              {{ file.name }} ({{ getFileSize(file.size) }})
            </span>
          </v-card-title>
        </v-col>

        <v-spacer />

        <v-col cols="12" md="auto">
          <v-card-actions>
            <v-btn
              rounded="0"
              variant="outlined"
              size="x-small"
              @click="handleFileRemove(index)"
            >
              Remove
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { getFileSize } from "@/lib/utils"
import { TaskFile } from "@/types/tasks"

defineProps<{
  title?: string
  files: (File | TaskFile)[]
}>()

const emits = defineEmits<{
  (e: "onFileRemove", index: number): void
}>()

function handleFileRemove(index: number) {
  emits("onFileRemove", index)
}
</script>
