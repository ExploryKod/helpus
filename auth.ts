import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { connectDB } from "./lib/mongo/dbConnect";
import User from "./lib/models/User";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null
                await connectDB();
                user = await User.findOne({ email: credentials.email });
                if (!user) throw new Error('No user found');
                const isMatch = credentials.password === user.password;
                if (!isMatch) throw new Error('Credds dont match');
                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id;
                token.username = user.username;
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.username = token.username as string;
            return session
        },
    }
})



