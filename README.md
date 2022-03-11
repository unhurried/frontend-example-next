# frontend-example-next

A simple Next.js project that serves user interface for TODO web app.

<kbd><img src="./resources/screenshot.png" width=500></kbd>

## Covered Features

* Functional components with Typescript
* UI components with Chakra UI
* User and API authentication with NextAuth.js working with an OpenID Connect (OAuth 2.0) provider.

## How to start development

### Start the backend server for development

Clone fullstack-example/backend" repository and run the following commands.

```shell
# Install dependencies
npm install

# Start OIDC provider
npm run oidc-provider

# Start the backend server  * need to be done in a new console.
npm run start:dev
```

### Install dependencies

```shell
npm install
```

### Run the application in the development mode

```shell
npm run dev
```

### Run the application in the production mode

```shell
npm run start
```

### Compile and minify for production

```shell
npm run build
```

### Lint and fix files

```shell
npm run lint
```
