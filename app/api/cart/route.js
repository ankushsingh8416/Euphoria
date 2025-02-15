import Cart from "@/models/Cart";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

// Handle POST request - Save cart data
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.user || !data.user.email) {
      return NextResponse.json(
        { error: "User data is missing" },
        { status: 400 }
      );
    }

    // Find or create the user
    let user = await User.findOne({ email: data.user.email });
    if (!user) {
      user = await User.create({
        name: data.user.name,
        email: data.user.email,
      });
    }

    if (!Array.isArray(data.products) || data.products.length === 0) {
      return NextResponse.json(
        { error: "Product data is missing" },
        { status: 400 }
      );
    }

    // Process products
    const productEntries = await Promise.all(
      data.products.map(async (item) => {
        let product = await Product.findById(item.productId);
        if (!product) throw new Error("Product not found");
        return { product: product._id, quantity: item.quantity || 1 };
      })
    );

    // Check if the user's cart exists
    let existingCart = await Cart.findOne({ user: user._id });
    if (existingCart) {
      existingCart.products = productEntries;
      await existingCart.save();
    } else {
      await Cart.create({ user: user._id, products: productEntries });
    }

    return NextResponse.json(
      { message: "Cart saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to save cart data" },
      { status: 500 }
    );
  }
}

// Handle GET request - Retrieve cart data
export async function GET() {
  try {
    await dbConnect();
    const carts = await Cart.find()
      .populate("user")
      .populate("products.product");
    return NextResponse.json(carts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve cart data" },
      { status: 500 }
    );
  }
}
