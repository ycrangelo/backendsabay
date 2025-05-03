import express from 'express';
import User from '../../models/userModel.mjs';

const userRouter = express.Router();


//creating acc
userRouter.get('/getsignup', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});


userRouter.post('/singup', async (req, res) => {
  const { username, fullname, userId, password, gender, contactNumber } = req.body;

  if (!username || !userId || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ userId }).select('userId');
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({
      username,
      fullname,
      userId,
      gender,
      contactNumber,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        username,
        fullname,
        userId,
        gender,
        contactNumber
      }
    });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default userRouter;
