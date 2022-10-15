# frontend-example-next

A simple Next.js project that serves user interface for TODO web app.

<kbd><img src="./resources/screenshot.png" width=500></kbd>

## Covered Features

* [v0.3](https://github.com/unhurried/frontend-example-next/tree/v0.3.0)
    * Functional components with Typescript
    * UI components development with [Storybook](https://storybook.js.org/)
    * UI components with [Chakra UI](https://chakra-ui.com/) and [Emotion](https://emotion.sh/)
    * Form validation with [Formik](https://formik.org/) and Yup.
    * User authentication with [NextAuth.js](https://next-auth.js.org/) working with an OpenID Connect (OAuth 2.0) provider.
    * Backend for fronend with [tRPC](https://trpc.io/), [zod](https://github.com/colinhacks/zod) and [Prisma](https://trpc.io/).

* [v0.2](https://github.com/unhurried/frontend-example-next/tree/v0.2.0)
    * API call with [SWR](https://swr.vercel.app/) and SDK generated by [OpenAPI Generator](https://openapi-generator.tech/).

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

### Run storybook

```shell
npm run storybook
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
