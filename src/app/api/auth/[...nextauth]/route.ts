import { supabase } from "@/lib/supabase/supaclient";
import NextAuth, { DefaultSession, User as NextAuthUser, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface SupabaseUser {
    id: string;
    user: string;
    email: string;
    password: string;
}

declare module "next-auth" {
    interface Session {
        user: {
            userName?: string | null;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        userId: string;
        userName: string;
    }

    interface JWT {
        userName?: string | null;
    }
}

// obsluzyc czy user jest zalogowany na froncie (przywitanie na stronie glownej)

const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user: { label: "User", type: "text" },
                password: { label: "Password", type: "password" },
            },
            // async authorize(credentials, req) {
            //     // Add logic here to look up the user from the credentials supplied
            //     const user = {
            //         id: "1",
            //         user: "J Smith",
            //         email: "jsmith@example.com",
            //     };

            //     if (user) {
            //         // Any object returned will be saved in `user` property of the JWT
            //         return user;
            //     } else {
            //         // If you return null then an error will be displayed advising the user to check their details.
            //         return null;

            //         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            //     }
            // },
            async authorize(credentials, req) {
                if (!credentials?.password || !credentials?.user) {
                    return null;
                }

                try {
                    const { data, error } = await supabase
                        .from("user")
                        .select("*")
                        .eq("user", credentials.user)
                        .single<SupabaseUser>();

                    if (error || !data) {
                        console.log("ERROR", error);
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        data.password,
                    );

                    if (!isPasswordValid) {
                        return null;
                    }

                    return {
                        id: data.id,
                        userId: data.id,
                        userName: data.user,
                    };
                } catch (error) {
                    console.log("ERROR", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
            if (user && "userName" in user) {
                token.userName = user.userName ?? null;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user && token.userName) {
                session.user.userName = token.userName as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
            return baseUrl;
        },
    },
};

const handler = NextAuth(authOptions);
export { authOptions };
export { handler as GET, handler as POST };
