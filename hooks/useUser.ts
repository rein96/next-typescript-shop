import { useMutation, useQuery, useQueryClient } from "react-query"
import { fetchJson } from "lib/api"
import { User } from "lib/user"

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

export function useSignIn(): UseSignInResult {
  const queryClient = useQueryClient()

  // Will be run from mutateAsync()
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

        // Force update USER_QUERY to log in immediately 
        queryClient.setQueryData('USER_QUERY', user)

        // Success log in
        return true

      } catch (error) {
        // Fail to log in
        return false
      }
    }
  }
}