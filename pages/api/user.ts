import { fetchJson } from "lib/api"
import { User } from "lib/user"
import { NextApiHandler } from "next"

const { API_URL } = process.env

const handleUser: NextApiHandler<User> = async (req, res) => {
  const { jwt } = req.cookies
  if (!jwt) {
    return res.status(401).end()
  }

  try {
    const user = await fetchJson(`${API_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${jwt}` },
    })
    res.status(200).json({
      id: user.id,
      name: user.username,
    })
  } catch (error) {
    res.status(401).end()
  }
}

export default handleUser;