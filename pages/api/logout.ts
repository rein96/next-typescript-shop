import cookie from 'cookie'

function handleLogout(req, res) {
  console.log('handleLogout')
  // Set jwt empty string value
  res.status(200)
    .setHeader('Set-Cookie', cookie.serialize('jwt', '', {
      path: '/api',
      // set the cookie expired
      // set epoch dates: January 1st 1970 -> already expired
      expires: new Date(0),
    }))
    .json({})
}

export default handleLogout