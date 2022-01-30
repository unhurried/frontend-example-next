import NextAuth from "next-auth"

async function refreshAccessToken(token) {
    const url = 'http://localhost:3002/token'
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
    token.user.accessToken = resBody.access_token
    return token
}

export default NextAuth({
    providers: [{
        id: "oidc",
        name: "oidc",
        type: "oauth",
        idToken: true,
        wellKnown: "http://localhost:3002/.well-known/openid-configuration",
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
                    accessToken: account.access_token,
                    accessTokenExpires: (account.expires_at - 10)  * 1000,
                    refreshToken: account.refresh_token,
                    user,
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
            // Copy the user object in the session.
            session.user = token.user
            return session
        }
    },
    secret: process.env.SECRET
})
