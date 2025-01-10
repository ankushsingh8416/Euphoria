
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect(); 

  try {
    const body = await req.json();
    const product = new Product(body);
    const savedProduct = await product.save();
    console.log('Product saved:', savedProduct);
    return NextResponse.json({ message: 'Product created successfully!', product: savedProduct });

  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json({ error: 'Error saving product', details: error.message }, { status: 500 });
  }
}
