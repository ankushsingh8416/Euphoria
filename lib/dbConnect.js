import mongoose from 'mongoose';

let isConnected = false; 
export default async function dbConnect() {
  if (isConnected) {
    console.log('Database is already connected.');
    return;
  }

  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error('MONGO_URI is not defined');

    const db = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
}
