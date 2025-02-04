import type { NextAuthConfig } from "next-auth"


export const authConfig = {
  session: {
    strategy: 'jwt'
  },
  providers: [],
  callbacks: {},
} satisfies NextAuthConfig