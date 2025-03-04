import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req, { params }) {
  try {
    console.log("Connecting to the database...");
    await dbConnect();
    console.log("Connected to the database.");

    const { id } = params;

    // Fetch a specific user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in GET /api/users/[id]:", error);
    return NextResponse.json(
      { error: "Error retrieving user", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { fullName, email, password, profileImage } = await req.json();

    console.log("Received profileImage:", profileImage); 

    const updateData = { name: fullName, email, profileImage };

    // If password is provided, hash it before updating
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in PUT /api/users/:id:", error);
    return NextResponse.json(
      { error: "Error updating profile", details: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    console.log("Connecting to the database...");
    await dbConnect();
    console.log("Connected to the database.");

    const { id } = params;

    // Delete the user by ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error in DELETE /api/users/[id]:", error);
    return NextResponse.json(
      { error: "Error deleting user", details: error.message },
      { status: 500 }
    );
  }
}

