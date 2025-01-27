import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/lib/axios";

declare module "next-auth" {
	interface User {
		accessToken?: string;
		refreshToken?: string;
	}
}

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const response = await apiClient.post("/login", {
						email: credentials?.email,
						password: credentials?.password,
					});

					if (response.data.user && response.data.tokens) {
						return {
							...response.data.user,
							accessToken: response.data.tokens.accessToken,
							refreshToken: response.data.tokens.refreshToken,
						};
					} else {
						return null;
					}
				} catch (error) {
					console.error("Authentication error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = token.user as { id: string; email: string; name: string };
			session.accessToken = token.accessToken as string;
			session.refreshToken = token.refreshToken as string;
			return session;
		},
	},
	pages: {
		signIn: "/login", 
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
