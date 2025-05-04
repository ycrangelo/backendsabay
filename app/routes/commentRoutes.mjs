import express from 'express';
import comments from '../../models/commentsModel.mjs';

const route = express.Router();

//fetching all comment in a post
route.post('/getComments', async (req, res) => {
  const { postId } = req.body;

  try {
    const comment = await comments.find({ postId }).sort({ createdAt: -1 });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


//creating a comment
route.post('/createComment', async (req, res) => {
  const {userId,postId,comment } = req.body;

  if (!userId || !postId || !comment) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newComment = new comments({
      userId,
      postId,
      comment,
    });

    await newComment.save();

    res.status(201).json({
      message: 'Post created successfully',
      Post: {
        userId,
        thoughts,
      }
    });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});





export default route;
