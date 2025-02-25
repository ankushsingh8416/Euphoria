import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// In-memory OTP storage
const otpStore = new Map();
const JWT_SECRET = "your-secret-key";

// Configure transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: "ankushsingh8416@gmail.com", pass: "trtz eetd cvzx xjuk" },
});

// Function to generate a 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP via email
const sendOTP = async (email) => {
  if (!email) return { success: false, message: "Email is required" };

  const otp = generateOTP();
  otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

  await transporter.sendMail({
    from: "ankushsingh8416@gmail.com",
    to: email,
    subject: "Your OTP for Login",
    html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #e1e1e1;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        width: 100%;
        text-align: center;
      }
      .header img {
        max-width: 100%;
        height: auto;
      }
      .content {
        padding: 30px;
        text-align: center;
      }
      .otp-container {
        margin: 20px 0;
        padding: 15px;
        background-color: #f5f5f5;
        border-radius: 6px;
      }
      .otp {
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 5px;
        color: #000;
      }
      .footer {
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #999999;
        background-color: #f7f7f7;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #1E381E;
        color: white !important;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 20px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
      <a href="https://euphoria-cloth.vercel.app/">
        <img src="https://images.cbazaar.com/pl_images/bannerimages/CB_WP_Feb18.jpg" alt="Company Logo Banner" />

        </a>
      </div>
      <div class="content">
        <h2>Verification Code</h2>
        <p>Hello,</p>
        <p>You've requested to log in to your account. Please use the following one-time password (OTP) to complete your login:</p>
        
        <div class="otp-container">
          <div class="otp">${otp}</div>
        </div>
        
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        
        <a href="https://euphoria-cloth.vercel.app/" class="button">Visit Our Website</a>
      </div>
      <div class="footer">
        <p>&copy; 2025 Your Euphoria. All rights reserved.</p>
        <p>123 Business Street, City, Country</p>
      </div>
    </div>
  </body>
  </html>
    `,
    text: `Your OTP is ${otp}`, // Plain text version for email clients that don't support HTML
  });
  return { success: true, message: "OTP sent successfully" };
};

// Function to verify OTP
const verifyOTP = (email, otp) => {
  const stored = otpStore.get(email);
  if (!stored) return { success: false, message: "No OTP found" };
  if (stored.expiresAt < Date.now())
    return { success: false, message: "OTP expired" };
  if (stored.otp !== otp) return { success: false, message: "Invalid OTP" };

  otpStore.delete(email);

  // Generate JWT token after successful OTP verification
  const token = jwt.sign({ email, isAdmin: true }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return { success: true, message: "OTP verified", token };
};

// Main API handler
export async function POST(req) {
  try {
    const { action, email, otp } = await req.json();

    if (action === "send") return Response.json(await sendOTP(email));
    if (action === "verify") return Response.json(verifyOTP(email, otp));

    return Response.json({ success: false, message: "Invalid action" });
  } catch (error) {
    console.error("Server error", error);
    return Response.json({ success: false, message: "Server error" });
  }
}
