//signup.js in routes folder

const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    const user = await User.create({ name, email, phone, password });
    res.status(201).json({ message: 'User created successfully.', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
