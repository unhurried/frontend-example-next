import NextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [{
        id: "oidc",
        name: "oidc",
        type: "oauth",
        idToken: true,
        wellKnown: process.env.OIDC_CONFIGURATION_EP,
        checks: ["pkce", "state"],
        clientId: "client_id_for_web",
        clientSecret: "client_secret_for_web",
        authorization: {
            params: { scope: "openid", }
        },
        profile(profile, tokens) {
            return {
                id: profile.sub,
            }
        },
    }],
    callbacks: {
        // Called when a JWT token is created after sign-in (with token, user and account parameters).
        // Or when the token is updated on every session check (with only token parameter).
        jwt: async ({ token, account }) => {
            // Embed the user object in a token.
            if (account) {
                return {
                    sub: token.sub!,
                    idToken: account.id_token!
                }
            } else {
                return token
            }
        },
        // Called when the session status is checked.
        session: async ({ session, token }) => {
            // Copy necessary parts of the token object to the session object.
            session.sub = token.sub
            session.idToken = token.idToken
            return session
        },
        // Called when a redirect happens to verify the destination of the redirect.
        redirect: ({ url, baseUrl }) => {
            // Allow redirects only to this app or IDP.
            const baseUrlForIdp = process.env.OIDC_BASE_URI
            if (baseUrlForIdp && url.startsWith(baseUrlForIdp)) {
                return url
            }
            if (url.startsWith(baseUrl)) {
                return url
            }
            return baseUrl
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
