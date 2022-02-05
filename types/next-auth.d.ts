import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    sub: string
    accessToken: string
    idToken: string
  }
}
