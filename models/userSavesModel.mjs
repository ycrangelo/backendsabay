import mongoose from "mongoose";

const userSavesSchema = new mongoose.Schema({
  userId: String,
  postId: String,
});

const UserSaves = mongoose.model("UserSaves", userSavesSchema);

export default UserSaves;
