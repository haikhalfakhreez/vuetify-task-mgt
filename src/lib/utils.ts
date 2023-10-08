import { customAlphabet } from "nanoid"
import { TaskFile } from "@/types/tasks"

export function getFileSize(size: number) {
  const units = ["B", "kB", "MB", "GB", "TB"]
  let unitIndex = 0

  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1000
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}

export function convertFile(file: File): Promise<TaskFile> {
  return new Promise((resolve, reject) => {
    const fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      base64: "",
    }

    const reader = new FileReader()

    reader.onload = event => {
      if (event.target) {
        fileInfo.base64 = event.target.result as string
        resolve(fileInfo)
      } else {
        reject(new Error(`Failed to convert file ${file.name}.`))
      }
    }

    reader.onerror = error => {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
)

export function assignColor(index: number) {
  const colors = [
    "#4A148C",
    "#880E4F",
    "#004D40",
    "#827717",
    "#1B5E20",
    "#E65100",
    "#E65100",
    "#263238",
  ]

  return colors[index % colors.length]
}

export function convertDateToDatetimeLocal(date: Date | string) {
  if (typeof date === "string") date = new Date(date)

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -1)
}
