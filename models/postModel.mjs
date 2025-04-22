import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: String,
  postId: String,
  coordinatesFrom: String,
  coordinatesTo: String,
  title: String,
  thoughts: String,
 picture: String,
  isDeleted: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
