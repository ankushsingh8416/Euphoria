import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';




export async function GET(req) {
  try {
    console.log('Connecting to the database...');
    await dbConnect();
    console.log('Connected to the database.');
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    return NextResponse.json(
      { error: 'Error retrieving users', details: error.message },
      { status: 500 }
    );
  }
}



