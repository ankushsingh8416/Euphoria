import { applyCors, runCors } from '@/lib/cors';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req) {

  const response = NextResponse.next();
  await applyCors(req, response); 
  try {
    console.log('Connecting to the database...');
    await dbConnect();
    console.log('Connected to the database.');

    const body = await req.json();
    console.log('Request body:', body);

    const product = new Product(body);
    const savedProduct = await product.save();
    console.log('Product saved:', savedProduct);

    return NextResponse.json({ message: 'Product created successfully!', product: savedProduct });
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    return NextResponse.json(
      { error: 'Error saving product', details: error.message },
      { status: 500 }
    );
  }
}
