import { NextApiHandler } from 'next';
import cookie from 'cookie';
import { fetchJson } from 'lib/api';

interface User {
  id: number;
  name: string;
}

const handleLogin: NextApiHandler<User> = async (req, res) => {
  // Method not allowed
  if (req.method !== 'POST') {
    res.status(405).end()
    return;
  }

  const { API_URL } = process.env

  const { email, password } = req.body;
  console.log('email, password', email, password)
  try {
    const { jwt, user } = await fetchJson(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password: password }),
    });

    res.status(200)
      .setHeader('Set-Cookie', cookie.serialize('jwt', jwt, {
        path: '/api', // read cookie on next server api path
        httpOnly: true, // restrict cookie can be read by client-side
      }))
      .json({
        id: user.id,
        name: user.username,
      });
  } catch (err) {
    res.status(401).end();
  }
}

export default handleLogin