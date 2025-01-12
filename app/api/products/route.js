import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const responseHeaders = {
    'Access-Control-Allow-Origin': '*', // Change '*' to a specific domain in production
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: responseHeaders,
      status: 204,
    });
  }

  try {
    console.log('Connecting to the database...');
    await dbConnect();
    console.log('Connected to the database.');

    const body = await req.json();
    console.log('Request body:', body);

    const product = new Product(body);
    const savedProduct = await product.save();
    console.log('Product saved:', savedProduct);

    return new Response(
      JSON.stringify({ message: 'Product created successfully!', product: savedProduct }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    console.error('Error in POST /api/products:', error);
    return new Response(
      JSON.stringify({ error: 'Error saving product', details: error.message }),
      { status: 500, headers: responseHeaders }
    );
  }
}
