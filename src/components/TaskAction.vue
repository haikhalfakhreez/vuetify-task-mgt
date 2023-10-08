<template>
  <v-row no-gutters>
    <v-col cols="12" md="6">
      <div class="text-caption">
        Tips: You can drag and drop the task to change the order. Just click and
        hold the drag handle on the title bar.
      </div>
    </v-col>

    <v-spacer />

    <v-col cols="12" md="auto" class="mt-4 mt-md-0">
      <v-row justify="end">
        <v-col cols="6">
          <task-filter />
        </v-col>

        <v-col cols="6">
          <v-btn
            color="primary"
            rounded="0"
            variant="flat"
            prepend-icon="mdi-plus"
            to="/create"
            block
          >
            Add Task
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import TaskFilter from "@/components/TaskFilter.vue"
</script>
