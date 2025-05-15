const express = require('express');
const router = express.Router();
const userData = require('../model/userdata');
const jwt = require('jsonwebtoken');

router.use(express.json());

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password required' });
  }
  try {
    const user = await userData.findOne({ email: req.body.email });
    if (!user) 
      return res.status(404).send({ message: 'User not found' });

  
  
    if (user.password === req.body.password) {
       if (!user.role) {
        return res.status(400).send({ message: 'User role not defined' });
      }

      const payload = { email: user.email, role: user.role};
      const token = jwt.sign(payload, 'employeeApp');

     return res.status(200).send({
       message: 'Login successful', 
       jtoken:token,
       role:user.role 
      });
    } else {
    return  res.status(401).send({ message: 'Invalid password' });
    }
  } catch (error) {
     console.error('Login error:', error);
   return res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
