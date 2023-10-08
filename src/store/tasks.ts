import { reactive } from "vue"
import { defineStore } from "pinia"
import { useStorage } from "@vueuse/core"
import { Task, TaskStatus, SortTaskBy } from "@/types/tasks"
import { useSearchParams } from "@/composables/useSearchParams"

export class TasksState {
  public pending: Task[] = []
  public processing: Task[] = []
  public completed: Task[] = []
}

export const useTasksStore = defineStore("tasks", () => {
  const localState = useStorage("tasks", new TasksState())
  const state = reactive<TasksState>(localState.value)

  const { query, from, to } = useSearchParams()

  function applyFilter(tasks: Task[]) {
    return tasks
      .map(task => {
        const lowercasedQuery = query.value.toLowerCase()
        const hasMatchedQuery = [
          task.title.toLowerCase().includes(lowercasedQuery),
          task.description.toLowerCase().includes(lowercasedQuery),
          task.labels?.some(label =>
            label.toLowerCase().includes(lowercasedQuery),
          ),
        ].some(Boolean)

        task.isHighlighted = query.value ? hasMatchedQuery : false

        return task
      })
      .filter(task => {
        const startTime = from.value
          ? new Date(from.value).getTime()
          : undefined
        const endTime = to.value ? new Date(to.value).getTime() : undefined
        const taskTime = new Date(task.estimatedDate).getTime()

        if (startTime && endTime)
          return taskTime >= startTime && taskTime <= endTime
        if (startTime && !endTime) return taskTime >= startTime
        if (!startTime && endTime) return taskTime <= endTime

        return true
      })
  }

  function getPendingTasks() {
    return applyFilter(state.pending)
  }

  function getProcessingTasks() {
    return applyFilter(state.processing)
  }

  function getCompletedTasks() {
    return applyFilter(state.completed)
  }

  function getProgressStats() {
    const total =
      state.pending.length + state.processing.length + state.completed.length
    const completed = state.completed.length

    return {
      percentage: total === 0 ? 0 : Math.ceil((completed / total) * 100),
      completed,
      total,
    }
  }

  function getTaskById(id: string) {
    return [...state.pending, ...state.processing, ...state.completed].find(
      task => task.id === id,
    )
  }

  function getStatusById(id: string) {
    if (state.pending.some(task => task.id === id)) return "pending"
    if (state.processing.some(task => task.id === id)) return "processing"
    if (state.completed.some(task => task.id === id)) return "completed"
  }

  function deleteTaskById(id: string) {
    const status = getStatusById(id)

    if (status) {
      const index = state[status].findIndex(task => task.id === id)
      if (index !== -1) state[status].splice(index, 1)
      useStorage("tasks", state)
    }
  }

  function sortTaskBy(status: TaskStatus, key: SortTaskBy) {
    if (key === "title") {
      state[status].sort((a, b) => {
        const titleA = a.title.toLowerCase()
        const titleB = b.title.toLowerCase()

        if (titleA < titleB) return -1
        if (titleA > titleB) return 1

        return 0
      })
    }

    if (key === "estimatedDate") {
      state[status].sort((a, b) => {
        const dateA = new Date(a.estimatedDate).getTime()
        const dateB = new Date(b.estimatedDate).getTime()

        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        return 0
      })
    }
  }

  function add(status: TaskStatus, task: Task) {
    state[status].push(task)
    useStorage("tasks", state)
  }

  function update(status: TaskStatus, task: Task) {
    const index = state[status].findIndex(t => t.id === task.id)
    if (index === -1) {
      state[status].push(task)
    } else {
      state[status].splice(index, 1, task)
    }
    useStorage("tasks", state)
  }

  function updateAll(status: TaskStatus, tasks: Task[]) {
    state[status] = tasks
    useStorage("tasks", state)
  }

  return {
    state,
    add,
    update,
    updateAll,
    getPendingTasks,
    getProcessingTasks,
    getCompletedTasks,
    getProgressStats,
    getTaskById,
    getStatusById,
    deleteTaskById,
    sortTaskBy,
  }
})
