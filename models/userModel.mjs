import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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


const User = mongoose.model("User", userSchema);

export default User;
