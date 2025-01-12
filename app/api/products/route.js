import {dbConnect} from '@/lib/dbConnect';
import Product from '@/models/Product';

const responseHeaders = {
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 
  'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow headers like Content-Type, Authorization
};

export async function POST(req) {
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: responseHeaders,
      status: 204, 
    });
  }

  try {
    // Connect to the database
    console.log('Connecting to the database...');
    await dbConnect();
    console.log('Connected to the database.');

    // Parse the request body
    const body = await req.json();
    console.log('Request body:', body);

    // Create a new product using the parsed body
    const product = new Product(body);
    const savedProduct = await product.save();
    console.log('Product saved:', savedProduct);

    // Return success response with saved product
    return new Response(
      JSON.stringify({ message: 'Product created successfully!', product: savedProduct }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    // Log and return error response
    console.error('Error in POST /api/products:', error);
    return new Response(
      JSON.stringify({ error: 'Error saving product', details: error.message }),
      { status: 500, headers: responseHeaders }
    );
  }
}
