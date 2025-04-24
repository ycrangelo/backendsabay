import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: String,
  gender: String,
  contactNumber: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Add compound index for frequently queried fields
userSchema.index({ userId: 1, username: 1 });

const User = mongoose.model("User", userSchema);

export default User;
