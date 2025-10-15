import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// In-memory OTP storage with cleanup
const otpStore = new Map();
const JWT_SECRET = process.env.JWT_SECRET || "adminauthsecret";
const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes

// Configure transporter with better error handling
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "ankushsingh8416@gmail.com",
    pass: process.env.EMAIL_PASS || "qmzc rjqn yrgk tzik",
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email server is ready");
  }
});

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Clean up expired OTPs periodically
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(email);
    }
  }
}, 60000); // Clean up every minute

// Function to send OTP via email
const sendOTP = async (email) => {
  try {
    if (!email || !email.includes("@")) {
      return { success: false, message: "Valid email is required" };
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + OTP_EXPIRY;

    // Store OTP with expiry
    otpStore.set(email, { otp, expiresAt });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER || "ankushsingh8416@gmail.com",
      to: email,
      subject: "Your OTP for Admin Login",
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
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #e1e1e1;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            width: 100%;
            text-align: center;
            background-color: #1E381E;
            padding: 20px;
          }
          .header img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
          }
          .content {
            padding: 30px;
            text-align: center;
          }
          .otp-container {
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            border-radius: 10px;
            border: 2px dashed #1E381E;
          }
          .otp {
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #1E381E;
            font-family: 'Courier New', monospace;
          }
          .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
            background-color: #f7f7f7;
            border-top: 1px solid #e1e1e1;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #1E381E;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 20px;
            font-weight: bold;
            transition: background-color 0.3s;
          }
          .button:hover {
            background-color: #2d5a2d;
          }
          .warning {
            color: #d32f2f;
            font-size: 14px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="color: white; margin: 0;">Admin Verification</h2>
          </div>
          <div class="content">
            <h2 style="color: #1E381E;">Verification Code</h2>
            <p>Hello,</p>
            <p>You've requested to log in to the admin panel. Please use the following one-time password (OTP) to complete your login:</p>
            
            <div class="otp-container">
              <div class="otp">${otp}</div>
            </div>
            
            <p><strong>This code will expire in 10 minutes.</strong></p>
            <p class="warning">⚠️ If you didn't request this code, please ignore this email and ensure your account is secure.</p>
            
            <a href="https://euphoria-cloth.vercel.app/cpanel/login" class="button">Go to Admin Login</a>
          </div>
          <div class="footer">
            <p>&copy; 2025 Euphoria. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
      `,
      text: `Your OTP for admin login is: ${otp}. This code will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`OTP sent to ${email}`);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP. Please try again." };
  }
};

// Verify OTP
const verifyOTP = (email, otp) => {
  try {
    if (!email || !otp) {
      return { success: false, message: "Email and OTP are required" };
    }

    const stored = otpStore.get(email);

    if (!stored) {
      return { success: false, message: "No OTP found. Please request a new one." };
    }

    if (stored.expiresAt < Date.now()) {
      otpStore.delete(email);
      return { success: false, message: "OTP expired. Please request a new one." };
    }

    if (stored.otp !== otp.trim()) {
      return { success: false, message: "Invalid OTP. Please check and try again." };
    }

    // OTP is valid, delete it and generate token
    otpStore.delete(email);

    const token = jwt.sign(
      {
        email,
        isAdmin: true,
        iat: Math.floor(Date.now() / 1000)
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log(`OTP verified for ${email}`);
    return { success: true, message: "OTP verified successfully", token };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, message: "Verification failed. Please try again." };
  }
};

// API Handler
export async function POST(req) {
  try {
    const body = await req.json();
    const { action, email, otp } = body;

    if (!action) {
      return Response.json(
        { success: false, message: "Action is required" },
        { status: 400 }
      );
    }

    if (action === "send") {
      if (!email) {
        return Response.json(
          { success: false, message: "Email is required" },
          { status: 400 }
        );
      }
      const result = await sendOTP(email);
      return Response.json(result, { status: result.success ? 200 : 400 });
    }

    if (action === "verify") {
      if (!email || !otp) {
        return Response.json(
          { success: false, message: "Email and OTP are required" },
          { status: 400 }
        );
      }
      const result = verifyOTP(email, otp);
      return Response.json(result, { status: result.success ? 200 : 400 });
    }

    return Response.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return Response.json(
      { success: false, message: "Server error occurred" },
      { status: 500 }
    );
  }
}