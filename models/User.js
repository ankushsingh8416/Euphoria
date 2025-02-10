import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
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
});

// Prevent redefining the model if it already exists
export default mongoose.models.User || mongoose.model("User", userSchema);
