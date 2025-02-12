# My Blank Template for Angular-Firebase scaffold

> My blank template to start building up a new project in Angular+Firebase

Just follow below instructions and a template with **routing-enabled** **routeguarded login checked** and **firebase secret safe** that you can safely commit on Github without a need to scrub it every time for API keys.

## Notes:

This project has pre-configured routing for authentication and some other basic information that I always use for all of my
single page application. Just though it will be a good idea to develop it as a scaffold so anyone can use it as a base for
firebase linked projects.

No firestore element is accessible without an anonymous login to protect the data so you don't have to by-pass the rules for it

Note: It strictly follows below standard steps, as this is not a generic guide to Auth-Guard in Angular:
https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md

## Step 1 of 5

create environment variable by the name APIKEY and it's value with Firebase APIKEY (you can also define a separate key for production). This variable will be used by "config.index.ts" file to generate the environment file will all the necessary secret keys.

## To Run

```bash
npm run start:dev
```

## To Build for Development

```bash
npm build
```

## To Build for Production

```bash
npm build:prod
```

## Firestore

### Structure

#### "profiles" collection

```
<document id {login uid}>
{
  uid: "",
  displayName: response.user.displayName,
  photoURL: response.user.photoURL,
  first_name: "",
  last_name: "",
  email: "",
  language: "",
  role: [support,service,client]
}
```

Note: based on ProfileDocumentInterface
