import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL_DEV}/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          )

          const { user, access, refreshToken } = response.data

          if (user && access && refreshToken) {
            return {
              ...user,
              access,
              refreshToken,
            }
          }

          return null
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        }
        token.access = user.access
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as {
        id: string
        email: string
        name: string
      }
      session.access = token.access as string
      session.refreshToken = token.refreshToken as string
      return session
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
}

export { authOptions }


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
