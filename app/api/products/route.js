import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log('Connecting to the database...');
    await dbConnect();
    console.log('Connected to the database.');

    const body = await req.json();

    const product = new Product(body);
    const savedProduct = await product.save();

    return NextResponse.json({ message: 'Product created successfully!', product: savedProduct });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error saving product', details: error.message },
      { status: 500 }
    );
  }
}


export async function GET(req) {
  try {
    console.log('Connecting to the database...');
    await dbConnect();
    console.log('Connected to the database.');
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    return NextResponse.json(
      { error: 'Error retrieving products', details: error.message },
      { status: 500 }
    );
  }
}



