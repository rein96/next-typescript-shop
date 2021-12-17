import React, { useState, FormEventHandler } from 'react';
import Page from 'components/Page';
import Field from 'components/Field';
import Input from 'components/Input';
import Button from 'components/Button';

const SignInPage: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log('should submit:', { email, password });
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
        <Button type="submit">
          Sign In
        </Button>
      </form>
    </Page>
  );
};

export default SignInPage;