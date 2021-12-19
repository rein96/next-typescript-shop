import { useQuery } from "react-query"
import { fetchJson } from "lib/api"

export function useUser() {
  const { data } = useQuery('USER_QUERY', async () => {
    try {
      return await fetchJson('/api/user')
    } catch (err) {
      return undefined
    }
  }, {
    staleTime: 30000, // 30 seconds
    cacheTime: Infinity,
  })

  return data;
}