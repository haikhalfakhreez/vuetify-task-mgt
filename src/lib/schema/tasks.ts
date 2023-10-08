import { z } from "zod"
import { TASK_STATUS } from "@/lib/constants"

export const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  estimatedDate: z.string(),
  status: z.enum(TASK_STATUS),
  labels: z.array(z.string()).optional(),
  attachments: z.array(z.instanceof(File)).optional(),
})

export const editSchema = taskSchema.extend({
  comment: z.string().optional(),
})
