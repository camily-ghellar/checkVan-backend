import pkg from 'jsonwebtoken';
const { verify } = pkg;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = user;
    next();
  });
};

export default authenticateToken;


