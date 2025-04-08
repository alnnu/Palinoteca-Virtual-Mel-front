import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/lib/axios";

declare module "next-auth" {
	interface User {
		access?: string;
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

					const response = await apiClient.post("/auth/login", {
						email: credentials?.email,
						password: credentials?.password,
					});
					console.log(response.data)
					if (
						response.data.user &&
						response.data.access &&
						response.data.refreshToken
					) {
						return {
							...response.data.user,
							access: response.data.access,
							refreshToken: response.data.refreshToken,
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
				token.user = { email: user.email, name: user.name };
				token.access = user.access;
				token.refreshToken = user.refreshToken;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = token.user as {
				id: string;
				email: string;
				name: string;
			};
			session.access = token.access as string;
			session.refreshToken = token.refreshToken as string;
			return session;
		},
	},
	session: {
		strategy: "jwt", 
                maxAge: 60 * 60 * 5, 
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
