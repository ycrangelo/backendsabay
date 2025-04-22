import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  password: String,
  fullname: String,
  gender: String,
  contactNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

export default User;
