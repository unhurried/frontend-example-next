import NextAuth from "next-auth"

async function refreshAccessToken(token) {
    const url = process.env.OIDC_TOKEN_EP
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: 'client_id_for_web',
        client_secret: 'client_secret_for_web',
        refresh_token: token.refreshToken,
    })

    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        method: 'POST'
    })
    const resBody = await response.json()
    if (!response.ok) {
        throw Error('Token refresh failed.')
    }

    token.accessToken = resBody.access_token
    token.accessTokenExpires = Date.now() + (resBody.expires_in - 30) * 1000
    token.refreshToken = resBody.refresh_token
    return token
}

export default NextAuth({
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
            params: { prompt: "consent", resource: "http://localhost/resource", scope: "openid offline_access todo", }
        },
        profile(profile, tokens) {
            return {
                id: profile.sub,
                accessToken: tokens.access_token,
            }
        },
    }],
    callbacks: {
        // Called when a JWT token is created after sign-in (with token, user and account parameters).
        // Or when the token is updated on every session check (with only token parameter).
        jwt: async ({ token, user, account }) => {
            // Embed the user object in a token.
            if (account) {
                return {
                    sub: token.sub,
                    accessToken: account.access_token,
                    accessTokenExpires: (account.expires_at - 10) * 1000,
                    refreshToken: account.refresh_token,
                    idToken: account.id_token,
                }
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            } else {
                return refreshAccessToken(token)
            }
        },
        // Called whtn the session status is checked.
        session: async ({ session, token }) => {
            // Copy necessary parts of the token object to the session object.
            session.sub = token.sub
            session.accessToken = token.accessToken
            session.idToken = token.idToken
            return session
        },
        // Called when a redirect happens to verify the destination of the redirect.
        redirect: ({ url, baseUrl }) => {
            // Allow redirects only to this app or IDP.
            const baseUrlForIdp = process.env.OIDC_BASE_URI
            if (url.startsWith(baseUrl) || url.startsWith(baseUrlForIdp)) {
                return url
            } else {
                return baseUrl
            }
        }
    },
    secret: process.env.SECRET,
})
