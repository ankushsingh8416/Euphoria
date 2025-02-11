import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product"; // ✅ Import the Product model

export async function GET(req) {
  try {
    await dbConnect(); 

    // ✅ Ensure Product model is registered by explicitly using it before query
    if (!Product) {
      throw new Error("Product model is not loaded properly.");
    }

    const users = await User.find().populate("orders.products.product");

    let orderList = [];

    users.forEach((user) => {
      user.orders.forEach((order) => {
        orderList.push({
          customerName: user.name,
          customerEmail: user.email,
          orderId: order._id,
          products: order.products.map((p) => ({
            title: p.product?.title || "Unknown Product",
            price: p.product?.price || 0,
            image: p.product?.images?.[0]?.defaultImage || "/placeholder.png",
            quantity: p.quantity,
          })),
          totalAmount: order.totalAmount,
          orderDate: order.orderDate,
          status: order.status,
        });
      });
    });

    return new Response(JSON.stringify(orderList), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
      console.log("this is data" + orderList)
    );
  }
}
