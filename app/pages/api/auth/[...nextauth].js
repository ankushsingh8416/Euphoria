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
      authorize(credentials) {
        const { email, password } = credentials;

        // Hardcoded credentials
        if (email === "nkshrazz@gmail.com" && password === "rajputankush999") {
          return {
            id: 1,
            name: "Ankush Rajput",
            email: "nkshrazz@gmail.com",
          };
        }

        // Return null if login fails
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/cpanel-auth"
},
  secret: ufgfiugdfhufgdkygdfmhj, 
});
