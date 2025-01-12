import mongoose from 'mongoose';

const uri = "mongodb+srv://nkshrazz:YnUk4j7rONZH4P2B@cluster0.mp45p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function dbConnect() {
  if (!uri) {
    console.error('MongoDB URI is not defined in environment variables');
    throw new Error('MongoDB URI is not defined');
  }

  if (mongoose.connection.readyState === 0) { 
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
      throw err;
    }
  } else {
    console.log('Already connected to MongoDB');
  }
}

export default dbConnect;
