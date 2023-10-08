import { ref, watchEffect } from "vue"
import { useRoute } from "vue-router"

export function useSearchParams() {
  const route = useRoute()
  const query = ref("")
  const from = ref("")
  const to = ref("")

  watchEffect(() => {
    const s = route.query

    const searchQuery = s.query as string
    const fromQuery = s.from as string
    const toQuery = s.to as string

    query.value = searchQuery ? searchQuery : ""
    from.value = fromQuery ? fromQuery : ""
    to.value = toQuery ? toQuery : ""
  })

  return {
    query,
    from,
    to,
  }
}
