// models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    email: { type: String, required: true }, // Store user's email for easy reference
    products: [
      {
        productId: { type: String, required: true }, // Store product ID
        title: { type: String, required: true }, // Store product title
        price: { type: Number, required: true }, // Store product price
        quantity: { type: Number, required: true }, // Store product quantity
      },
    ],
    totalAmount: { type: Number, required: true }, // Store total amount of the cart
    paymentStatus: { type: String, default: "completed" }, // Store payment status
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);