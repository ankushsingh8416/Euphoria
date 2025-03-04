import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    try {
        console.log('Connecting to the database...');
        await dbConnect();
        console.log('Connected to the database.');

        const { id } = params;

        // Fetch a specific product by ID
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error in GET /api/products/[id]:', error);
        return NextResponse.json(
            { error: 'Error retrieving product', details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        console.log('Connecting to the database...');
        await dbConnect();
        console.log('Connected to the database.');

        const { id } = params;

        // Delete the product by ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Product deleted successfully', product: deletedProduct },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in DELETE /api/products/[id]:', error);
        return NextResponse.json(
            { error: 'Error deleting product', details: error.message },
            { status: 500 }
        );
    }
}