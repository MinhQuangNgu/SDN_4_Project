import jwt from 'jsonwebtoken'


function generateAccessToken(username) {
  // tạo access token key = header + payload + secretkey
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '60s' });
};

function authenticateToken(req, res, next) {
  // url: '/user/token',
  if (req.url == "/user/login" || req.url == '/user/register' || req.url == '/user/forgot-password') {
    next();
  }

  else {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)

      if (err) return res.status(200).json({
        data: {
          success: false,
        }
      });

      req.user = user

      next()
    })
  }
}

// module.exports = { generateAccessToken: generateAccessToken, authenticateToken: authenticateToken }
export { generateAccessToken, authenticateToken };