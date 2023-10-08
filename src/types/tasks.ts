import { TASK_STATUS, SORT_BY } from "@/lib/constants"

export type Task = {
  id: string
  title: string
  description: string
  estimatedDate: string | Date
  attachments?: TaskFile[]
  labels?: string[]
  isHighlighted?: boolean
  comment?: string
}

export type TaskStatus = (typeof TASK_STATUS)[number]

export type TaskFile = {
  name: string
  size: number
  type: string
  lastModified: number
  base64: string
}

export type SortTaskBy = (typeof SORT_BY)[number]
