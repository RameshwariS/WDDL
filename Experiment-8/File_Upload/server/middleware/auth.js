// server/middleware/auth.js
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check Authorization header first
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Then check cookies
  else if (req.cookies?.jwt) { // Added optional chaining
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id }; // Simplified user object
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};