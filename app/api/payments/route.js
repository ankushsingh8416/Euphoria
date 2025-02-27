import axios from "axios";

export async function GET(req) {
  try {
    const { data } = await axios.get("https://api.razorpay.com/v1/payments", {
      auth: {
        username: process.env.RAZORPAY_KEY_ID || "rzp_test_R9imru43nM8kiI",
        password: process.env.RAZORPAY_KEY_SECRET || "h2BVoTwOnWXUnB8hVTVuUyys",
      },
    });

    return Response.json({ payments: data.items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return Response.json({ message: "Failed to fetch payments" }, { status: 500 });
  }
}
