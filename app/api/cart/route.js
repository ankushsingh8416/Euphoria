import Cart from "@/models/Cart";
import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

// Handle POST request - Save cart data
export async function POST(req) {
  try {
    await dbConnect();
    const { user, products } = await req.json();

    console.log(user, products);
    const existingUser = await User.findOneAndUpdate(
      { email: user.email },
      { name: user.name },
      { new: true, upsert: true }
    );

    // Create a separate cart entry for each product
    const cartEntries = products.map((item) => ({
      user: existingUser._id,
      products: [{ product: item.productId, quantity: item.quantity || 1 }],
    }));

    await Cart.insertMany(cartEntries);

    return NextResponse.json(
      { message: "Products added to cart successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save cart data" },
      { status: 500 }
    );
  }
}

// Handle GET request - Retrieve cart data
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // Get user ID from query params

    const query = userId ? { user: userId } : {}; // Filter by user if provided

    const carts = await Cart.find(query)
      .populate("user")
      .populate("products.product");

    return NextResponse.json(carts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve cart data" },
      { status: 500 }
    );
  }
}
