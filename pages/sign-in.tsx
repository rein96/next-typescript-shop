import React, { useState, FormEventHandler } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Page from 'components/Page';
import Field from 'components/Field';
import Input from 'components/Input';
import Button from 'components/Button';
import { fetchJson } from 'lib/api';

const SignInPage: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isError, isLoading, mutateAsync } = useMutation(() => fetchJson('api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }))

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log('should submit:', { email, password });
    try {
      // Get user data from useMutation hook
      const user = await mutateAsync()

      // Force update USER_QUERY to log in immediately 
      queryClient.setQueryData('USER_QUERY', user)

      // Redirect to home
      router.push('/')

      console.log('handleSubmit: user', user)

    } catch (err) {
      // mutation.isError will be true
    }
  };

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {
          isError && <p className="text-red-700">
            Invalid credentials
          </p>
        }
        {
          isLoading &&
          <p>Loading...</p>
        }
        {
          !isLoading &&
          <Button type="submit">
            Sign In
          </Button>
        }
      </form>
    </Page>
  );
};

export default SignInPage;