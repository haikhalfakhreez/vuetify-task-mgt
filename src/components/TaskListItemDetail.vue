<template>
  <div>
    <label class="text-caption font-weight-medium">{{ label }}</label>
    <div class="text-caption">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
