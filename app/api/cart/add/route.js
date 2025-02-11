import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cart";

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, product } = await req.json();

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [product] });
    } else {
      cart.items.push(product);
    }

    await cart.save();
    return Response.json(cart, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
