import { useMutation, useQuery, useQueryClient } from "react-query"
import { fetchJson } from "lib/api"
import { User } from "lib/user"

const USER_QUERY_KEY = 'USER_QUERY_KEY'

interface SignInVariables {
  email: string;
  password: string;
}

interface UseSignInResult {
  signInError: boolean;
  signInLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
}

export function useUser(): User {
  const { data } = useQuery(USER_QUERY_KEY, async () => {
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

export function useSignIn(): UseSignInResult {
  const queryClient = useQueryClient()

  const { isError, isLoading, mutateAsync } =
    useMutation<User, Error, SignInVariables>(({ email, password }) =>
      fetchJson('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }))

  return {
    signInError: isError,
    signInLoading: isLoading,
    signIn: async (email: string, password: string) => {
      try {
        // Get user data from useMutation hook
        const user = await mutateAsync({ email, password })

        // Force update USER_QUERY_KEY to log in immediately 
        queryClient.setQueryData(USER_QUERY_KEY, user)

        // Success log in
        return true

      } catch (error) {
        // Fail to log in
        return false
      }
    }
  }
}

export function useSignOut() {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(() => fetchJson('api/logout'))

  return async () => {
    await mutateAsync()

    // Force update USER_QUERY_KEY 
    // to log out immediately (undefined value)
    queryClient.setQueryData(USER_QUERY_KEY, undefined)
  }
}