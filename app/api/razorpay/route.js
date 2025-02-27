import Razorpay from "razorpay";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_R9imru43nM8kiI",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "h2BVoTwOnWXUnB8hVTVuUyys",
    });

    const options = {
      amount: body.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
