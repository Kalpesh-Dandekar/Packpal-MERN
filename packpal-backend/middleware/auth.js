const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Extract token from Authorization header: "Bearer <token>"
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request object
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
