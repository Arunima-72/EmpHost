const jwt = require('jsonwebtoken');
const User=require('../model/userdata')
const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  try {
    if (!token) throw 'Unauthorized access';
    const payload = jwt.verify(token, 'employeeApp');
    req.user = payload; 
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied: Admins only' });
  }
  next();
};


module.exports = { verifyToken, admin };
