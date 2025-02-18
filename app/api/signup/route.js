import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';

export async function POST(request) {
  try {
    console.log("Connecting to MongoDB...");
    await dbConnect();
    console.log("Connected to MongoDB.");

    console.log("Parsing request body...");
    const { username, email, password } = await request.json();
    console.log("Request body:", { username, email, password });

    console.log("Checking if user exists...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    console.log("Creating new user...");
    const user = new User({ username, email, password });
    await user.save();
    console.log("User created:", user);

    console.log("Returning success response...");
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}