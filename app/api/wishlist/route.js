import Wishlist from "@/models/Wishlist";
import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

// Handle POST request - Save Wishlist data
export async function POST(req) {
  try {
    await dbConnect();
    const { user, products } = await req.json();

    console.log(user, products);
    const existingUser = await User.findOneAndUpdate(
      { email: user.email },
      { name: user.name },
      { new: true, upsert: true }///////////////////////////////////////////////////
    );

    // Create a separate Wishlist entry for each product
    const wishlistEntries = products.map((item) => ({
      user: existingUser._id,
      products: [{ product: item.productId, quantity: item.quantity || 1 }],
    }));

    await Wishlist.insertMany(wishlistEntries);

    return NextResponse.json(
      { message: "Products added to Wishlist successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save Wishlist data" },
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

    const wishlist = await Wishlist.find(query)
      .populate("user")
      .populate("products.product");

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve Wishlist data" },
      { status: 500 }
    );
  }
}
