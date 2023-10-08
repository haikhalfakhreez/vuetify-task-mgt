<template>
  <v-container class="container py-8">
    <v-row no-gutters>
      <v-col cols="auto" class="px-0 ml-n4">
        <go-to-dashboard-button />
      </v-col>
    </v-row>

    <h2 class="text-h4 text-md-h2 font-weight-bold mb-8 mt-4">Create a Task</h2>

    <create-form />
  </v-container>
</template>

<script setup lang="ts">
import CreateForm from "@/components/CreateForm.vue"
import GoToDashboardButton from "@/components/GoToDashboardButton.vue"
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
