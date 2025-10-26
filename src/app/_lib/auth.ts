import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./prisma"
import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      id?: string
    }
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // Only force the account selector and consent in non-production environments.
    // In production we must NOT force prompt so users get the normal OAuth UX.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      ...(process.env.NODE_ENV !== "production" && {
        authorization: {
          params: {
            prompt: "select_account consent",
            access_type: "offline",
            include_granted_scopes: "true",
          },
        },
      }),
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      // token is available when using JWT sessions; `user` is available when
      // using database sessions (Prisma adapter). Support both to avoid
      // `Cannot read properties of undefined (reading 'sub')` errors.
      const userId = token?.sub ?? user?.id
      if (userId) {
        session.user = { ...session.user, id: userId as string }
      }
      return session
    },
    // Attempt to link OAuth accounts to an existing user with the same verified email.
    // This prevents the `OAuthAccountNotLinked` redirect by creating the missing
    // Account row in the database when it's safe to do so.
    signIn: async ({ user, account, profile }) => {
      try {
        // Only attempt linking for OAuth providers (like Google) and when the
        // provider supplied a verified email.
        // Normalize profile safely without using `any` to satisfy eslint rules.
        const prof = profile as Record<string, unknown> | undefined
        const emailFromProfile =
          prof && typeof prof.email === "string" ? prof.email : undefined
        const email = user?.email ?? emailFromProfile
        const emailVerified =
          prof && typeof prof.email_verified === "boolean"
            ? prof.email_verified
            : undefined
        if (!account || !email) return true

        // Only link when the provider reports the email as verified (prevents
        // account takeover by unverified email claims).
        if (emailVerified === false) return true

        // Find an existing user with the same email.
        const existing = await db.user.findUnique({ where: { email } })
        // If an existing user exists and they don't already have this provider
        // linked, create the account record so NextAuth can sign the user in.
        if (existing && existing.id !== (user?.id ?? existing.id)) {
          // Avoid duplicate creation if account already exists.
          const alreadyLinked = await db.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          })
          if (!alreadyLinked) {
            await db.account.create({
              data: {
                userId: existing.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                // expires_at should be an integer (seconds); ensure it's a number or leave null
                expires_at:
                  typeof account.expires_at === "number"
                    ? account.expires_at
                    : null,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            })
          }
        }
        return true
      } catch (err) {
        console.error("signIn callback error:", err)
        return false
      }
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
