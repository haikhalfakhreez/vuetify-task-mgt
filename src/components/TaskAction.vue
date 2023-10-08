<template>
  <v-row no-gutters>
    <v-spacer />

    <v-row justify="end">
      <v-col cols="auto">
        <task-filter />
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          rounded="0"
          variant="flat"
          prepend-icon="mdi-plus"
          to="/create"
        >
          Add Task
        </v-btn>
      </v-col>
    </v-row>
  </v-row>
</template>

<script setup lang="ts">
import TaskFilter from "@/components/TaskFilter.vue"
</script>
