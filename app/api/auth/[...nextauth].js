import NextAuth from "next-auth";
import mongoose from 'mongoose';
import User from '@/models/User';

// Use MONGO_URI with a fallback value
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://nkshrazz:YnUk4j7rONZH4P2B@cluster0.mp45p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default NextAuth({
  providers: [
  
  ],
  secret: process.env.NEXTAUTH_SECRET || "ankush@jwtnextauthsecret", // Fallback value for secret
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email, name } = profile;
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
  database: process.env.MONGO_URI || "mongodb+srv://nkshrazz:YnUk4j7rONZH4P2B@cluster0.mp45p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", // Fallback value for database
});