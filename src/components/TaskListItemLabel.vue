<template>
  <v-chip
    v-for="(item, index) in labels"
    :key="index"
    :color="assignColor(index)"
    size="x-small"
    class="me-1"
  >
    {{ item }}
  </v-chip>
</template>

<script setup lang="ts">
import { assignColor } from "@/lib/utils"

defineProps<{
  labels: string[]
}>()
</script>
