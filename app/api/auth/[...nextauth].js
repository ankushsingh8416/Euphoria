import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import mongoose from 'mongoose';
import User from '@/models/User';

// Use MONGO_URI instead of MONGODB_URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email, name } = profile; // I used profile instead of user
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        await User.create({ email, name });
      }

      return true;
    },
    async session({ session, user }) {
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id;
      }
      return session;
    },
  },
  database: process.env.MONGO_URI, // Use MONGO_URI here as well
});