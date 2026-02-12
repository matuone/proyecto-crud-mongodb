const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const tokenLimpio = token.replace('Bearer ', '');

  jwt.verify(tokenLimpio, process.env.JWT_SECRET, function (error, decoded) {
    if (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
