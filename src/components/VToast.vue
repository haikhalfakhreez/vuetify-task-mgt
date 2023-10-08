<template>
  <v-snackbar v-model="value" :timeout="5000" :color="color" elevation="24">
    {{ config.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { ToastConfig } from "@/types/toast"

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    config: ToastConfig
  }>(),
  {
    config: () => ({
      show: false,
      message: "",
      variant: "default",
    }),
  },
)

const emit = defineEmits(["update:modelValue"])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

const color = computed(() => {
  switch (props.config.variant) {
    case "success":
      return "green-darken-3"
    case "error":
      return "red-accent-4"
    default:
      return "blue-grey-darken-1"
  }
})
</script>
