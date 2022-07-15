# Grannytalks

The main purpose of this application is to make a copycat of Medium, which is known as an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic, in other words, a blog.

## How it works

This application is basically a simple blog which requires the user to be subscribed, also, authenticated. If the user doesn't have any active subscription, he will still be able to read part of the content, but, not everything. Currently, the authentication part is done using a library called NextAuth with just Github as login provider.

## How to run ℹ️

To run the application locally you'll need:

- `NodeJS v16.15`

### 1. Environment variables ⚙️

Create a file named `.env.local` and add the variables described in the `.env.sample` file.
Although this file is listed in the `.gitignore` file make sure to `NOT` push it to GitHub.
And **remember** the file is called `.env.local` following [Next.js documentation](https://nextjs.org/docs/basic-features/environment-variables)

#### More details on environment variables ℹ️

<details>
  <summary>1.1 NEXTAUTH_URL</summary>
  
  ##### This should be set as the URL of the website/application.
</details>

<details>
  <summary>1.2 NEXTAUTH_SECRET</summary>
  
  ##### As described in [NextAuth.js documentation](https://next-auth.js.org/configuration/options), it is used to encrypt the NextAuth.js JWT.
</details>

<details>
  <summary>1.3 GITHUB_ID</summary>
  
  ##### The ID of your Github application, you need to create it to serve as a login provider for your application, you can create one [here](https://github.com/settings/developers) on `New OAuth App` button.
</details>

<details>
  <summary>1.4 GITHUB_SECRET</summary>
  
  ##### This token you can get accessing your application home on Github and creating a new client secret.
</details>

<details>
  <summary>1.5 FAUNADB_KEY</summary>
  
  ##### FaunaDB is being used on this project as a key-value, chosen because of its modern cloud API and native GraphQL, known as FQL. To get this token create a database on [FaunaDB](https://dashboard.fauna.com/) and then, go to Security -> Keys and generate a new key.
</details>

<details>
  <summary>1.6 NEXT_PUBLIC_STRIPE_PUBLIC_KEY</summary>
  
  ##### This particular environment variable name can be described accordingly to [Next.js documentation](https://nextjs.org/docs/basic-features/environment-variables). Variables starting with `NEXT_PUBLIC_` are exposed to the browser. You get this from Stripe, which is currently being used as our payment processor. To get this variable, create an account and an application on [Stripe](https://stripe.com/en-br), then, head to [Developers APIs page](https://dashboard.stripe.com/apikeys), there you can find _Publishable key_
</details>

<details>
  <summary>1.7 STRIPE_SECRET_KEY</summary>
  
  ##### On the same page that you got the _Publishable key_ from, you should find _Secret key_, that is it.
</details>

<details>
  <summary>1.8 STRIPE_SUCCESS_URL</summary>
  
  ##### The name of this variable speaks for itself, this is the URL that the user will be redirected to in case of success.
</details>

<details>
  <summary>1.9 STRIPE_CANCEL_URL</summary>
  
  ##### The URL that the user is going to be redirected to if the transaction is unsuccessful or cancelled.
</details>

<details>
  <summary>1.10 STRIPE_WEBHOOK_KEY</summary>
  
  ##### This application listens for the webhook events coming from Stripe, a key is being used to check its authenticity, you can get this following the instructions from [Stripe events](https://dashboard.stripe.com/webhooks/create?endpoint_location=local) 
</details>

#### To install package dependencies

```console
yarn && yarn global add typescript
```

#### To run and watch for files changes on development

```console
yarn run dev
```

#### References:

[https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started) - Framework commonly used for SSR React and SSG
[https://chakra-ui.com/getting-started/nextjs-guide](https://chakra-ui.com/getting-started/nextjs-guide) - Design system for React
[https://prismic.io/docs/technologies/nextjs](https://prismic.io/docs/technologies/nextjs) - Headless CMS
[https://next-auth.js.org/](https://next-auth.js.org/) - Authentication for Next.js
[https://stripe.com/en-br](https://stripe.com/en-br) - Payment processor
[https://fauna.com/](https://fauna.com/) - Key-value storage used to store users and their subscriptions
