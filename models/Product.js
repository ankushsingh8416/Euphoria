import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the product.'],
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: String,
  brand: String,
  size: [String],
  category: String,
  page: String,
  readyToShip: Boolean,
  newArrivals: Boolean,
  images: [
    {
      defaultImage: String,
      hoverImage: String,
    }

  ],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
