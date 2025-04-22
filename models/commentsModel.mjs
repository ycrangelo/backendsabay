import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: String,
  userId: String,
  postId: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
