import React, { useState, FormEventHandler } from 'react';
import Page from 'components/Page';
import Field from 'components/Field';
import Input from 'components/Input';
import Button from 'components/Button';
import { fetchJson } from 'lib/api';

const SignInPage: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log('should submit:', { email, password });
    setStatus({ loading: true, error: false })
    try {
      const response = await fetchJson('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      setStatus({ loading: false, error: false })
      console.log('response', response)
    } catch (err) {
      setStatus({ loading: false, error: true })
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
          status.error && <p className="text-red-700">
            Invalid credentials
          </p>
        }
        {
          status.loading &&
          <p>Loading...</p>
        }
        {
          !status.loading &&
          <Button type="submit">
            Sign In
          </Button>
        }
      </form>
    </Page>
  );
};

export default SignInPage;