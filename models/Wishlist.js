import mongoose from "mongoose";

// Check if the model is already defined (to prevent re-compilation errors)
const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
          required: true,
        },
        quantity: { type: Number, default: 1 }, 
      }, 
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);
