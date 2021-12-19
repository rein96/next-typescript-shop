import React, { useState, FormEventHandler } from 'react';
import { useRouter } from 'next/router';
import Page from 'components/Page';
import Field from 'components/Field';
import Input from 'components/Input';
import Button from 'components/Button';
import { useSignIn } from 'hooks/useUser';

const SignInPage: React.FC = () => {
  const router = useRouter();

  const { signIn, signInError, signInLoading } = useSignIn()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const isValid = await signIn(email, password)

      // Redirect to home 
      if (isValid) return router.push('/')

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
        {signInError && <p className="text-red-700">Invalid credentials</p>}
        {signInLoading && <p>Loading...</p>}
        {!signInLoading && <Button type="submit">Sign In</Button>}
      </form>
    </Page>
  );
};

export default SignInPage;