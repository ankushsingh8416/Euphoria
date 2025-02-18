import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  profileImage: {
    type: String, 
    default: "/images/profile.webp", 
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
