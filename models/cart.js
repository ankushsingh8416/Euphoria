import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
