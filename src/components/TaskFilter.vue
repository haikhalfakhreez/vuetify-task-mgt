<template>
  <div class="position-relative">
    <v-btn
      variant="outlined"
      rounded="0"
      prepend-icon="mdi-filter"
      @click="dialog = true"
    >
      Filter
    </v-btn>
    <span class="dot-indicator">
      {{ filterCount }}
    </span>
  </div>

  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-item>
        <v-card-title>
          <span class="text-body-1 font-weight-semibold">Filter</span>
        </v-card-title>
      </v-card-item>

      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12">
            <label class="d-block mb-1">
              Search by Title, Description, or Label
              <small class="text-grey-darken-1">
                *(This will highlight the task)
              </small>
            </label>
            <v-text-field
              v-model="query"
              type="search"
              placeholder="Search for task"
              variant="outlined"
              clearable
              flat
              :hide-details="true"
              rounded="0"
            />
          </v-col>

          <v-col cols="12" class="mt-4">
            <label class="d-block mb-2">
              Filter by Date and Time
              <small class="text-grey-darken-1">
                *(This will filter out the task)
              </small>
            </label>

            <v-text-field
              variant="outlined"
              rounded="0"
              label="From"
              type="datetime-local"
              v-model="from"
            ></v-text-field>

            <v-text-field
              variant="outlined"
              rounded="0"
              label="To"
              type="datetime-local"
              v-model="to"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="plain" rounded="0" @click="reset"> Clear Filter </v-btn>
        <v-btn color="primary" rounded="0" @click="submit"> Apply </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter, RouteQueryAndHash } from "vue-router"
import { useSearchParams } from "@/composables/useSearchParams"

const router = useRouter()
const dialog = ref(false)
const { query, from, to } = useSearchParams()

function submit() {
  const searchParams: RouteQueryAndHash["query"] = {}

  if (query.value) {
    searchParams.query = query.value
  }

  if (from.value) {
    searchParams.from = from.value
  }

  if (to.value) {
    searchParams.to = to.value
  }

  router.replace({
    query: searchParams,
  })

  dialog.value = false
}

function reset() {
  query.value = ""
  from.value = ""
  to.value = ""
}

const filterCount = computed(() => {
  let count = 0

  if (query.value) count++
  if (from.value) count++
  if (to.value) count++

  return count
})
</script>

<style scoped>
.dot-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background-color: #d50000;
  transform: translate(50%, -50%);
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
