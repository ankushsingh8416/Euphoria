import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (email === "nkshrazz@gmail.com" && password === "rajputankush999") {
          return { id: 1, name: "Ankush Rajput", email: "nkshrazz@gmail.com" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/cpanel-auth", 
  },
  secret: process.env.NEXTAUTH_SECRET || "asdasd",
  debug: true, 
});
