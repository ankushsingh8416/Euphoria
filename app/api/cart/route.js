import Cart from "@/models/Cart";
import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    await dbConnect();
    const { email, products, totalAmount } = await req.json();

    // Find or create the user
    const user = await User.findOneAndUpdate(
      { email },
      { email },
      { new: true, upsert: true }
    );

    // Create a new cart document
    const cart = new Cart({
      user: user._id,
      email,
      products,
      totalAmount,
    });

    await cart.save();

    return NextResponse.json(
      { message: "Cart data stored successfully", cart },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error storing cart data:", error);
    return NextResponse.json(
      { error: "Failed to store cart data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const carts = await Cart.find(); 

    return NextResponse.json(carts);
  } catch (error) {
    console.error("Error in GET /api/cart:", error);
    return NextResponse.json(
      { error: "Error retrieving carts", details: error.message },
      { status: 500 }
    );
  }
}
