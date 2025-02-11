import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    try {
        console.log('Connecting to the database...');
        await dbConnect();
        console.log('Connected to the database.');

        const { id } = params;

        // Fetch a specific user by ID
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json(
                { error: 'user not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error in GET /api/users/[id]:', error);
        return NextResponse.json(
            { error: 'Error retrieving user', details: error.message },
            { status: 500 }
        );
    }
}
