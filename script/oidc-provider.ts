import { Provider, Configuration } from 'oidc-provider'

const configuration: Configuration = {
  formats: { customizers: {
    jwt: async (ctx, token, parts) => { 
      parts.header = { typ: "JWT" }
      return parts
    }
  }},
  clients: [
    {
      application_type: 'web',
      client_id: 'client_id_for_web',
      client_secret: 'client_secret_for_web',
      scope: 'openid offline_access todo',
      grant_types: ['authorization_code', 'refresh_token'],
      redirect_uris: ['http://localhost:3000/api/auth/callback/oidc'],
      post_logout_redirect_uris: ['http://localhost:3000'],
    },
    {
      application_type: 'native',
      client_id: 'client_id_for_native',
      token_endpoint_auth_method: 'none',
      scope: 'openid offline_access todo',
      grant_types: ['authorization_code', 'refresh_token'],
      redirect_uris: ['http://localhost:8080/callback'],
    },
  ],
  scopes: ['openid', 'offline_access', 'todo'],
  features: {
    resourceIndicators: {
      enabled: true,
      useGrantedResource: () => { return true }, // allow clients to omit "resource" parameter in Token endpoint.
      getResourceServerInfo: async (ctx, resourceIndicator, client) => {
        if (client.scope && client.scope.split(' ').includes('todo')) {
          return {
            scope: 'todo',
            audience: 'todo-api',
            accessTokenFormat: 'jwt',
            jwt: { sign: { alg: 'RS256' }, },
          }
        } else {
          return { scope: '' }
        }
      },
    },
  },
  clientBasedCORS: () => { return true },
  ttl: { AccessToken: 3600 }
};

const port = process.env.PORT || 3002
const oidc = new Provider(`http://localhost:${port}`, configuration)
oidc.listen(port, () => {
  console.log(`oidc-provider listening on port ${port}.`)
})
