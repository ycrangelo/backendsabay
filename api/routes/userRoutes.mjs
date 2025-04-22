import express from 'express';
import User from '../../models/userModel.mjs';

const router = express.Router();

// Get all users (for testing/demo)
router.get('/singup', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Signup route (POST)
router.post('/singup', async (req, res) => {
  const { username,fullname, userId, password,gender,contactNumber } = req.body;

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ username, fullname, userId,gender,contactNumber,password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
