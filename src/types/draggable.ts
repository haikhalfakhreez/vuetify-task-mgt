import { Task } from "@/types/tasks"

// See: https://github.com/SortableJS/vue.draggable.next#events
export type DragChangeEvent = {
  added: {
    element: Task
    newIndex: number
  }
  removed: {
    element: Task
    oldIndex: number
  }
  moved: {
    element: Task
    newIndex: number
    oldIndex: number
  }
}
