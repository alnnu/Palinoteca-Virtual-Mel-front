import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    access?: string
    refreshToken?: string
    user: {
      id: string
      name: string
      email: string
    }
  }

  interface User extends DefaultUser {
    access?: string
    refreshToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access?: string
    refreshToken?: string
    user?: {
      id: string
      name: string
      email: string
    }
  }
}

