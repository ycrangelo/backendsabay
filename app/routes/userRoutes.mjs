import express from 'express';
import User from '../../models/userModel.mjs';

const router = express.Router();

// Get all users (for testing/demo) - Add pagination and limit
router.get('/getsignup', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password') // Exclude password from response
      .skip(skip)
      .limit(limit)
      .lean(); // Convert to plain JS objects for faster processing

    const total = await User.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signup route (POST)
router.post('/singup', async (req, res) => {
  const { username, fullname, userId, password, gender, contactNumber } = req.body;

  // Input validation
  if (!username || !userId || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Use findOne with projection to only fetch necessary fields
    const existingUser = await User.findOne({ userId }).select('userId').lean();
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

    // Return user without sensitive data
    const userResponse = {
      username: newUser.username,
      fullname: newUser.fullname,
      userId: newUser.userId,
      gender: newUser.gender,
      contactNumber: newUser.contactNumber,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
