# My Blank Template for Angular-Firebase scafold

> My blank template to start building up a new project in Angular+Firebase

Just follow below instructions and a template with **routing-enabled** **routeguarded login checked** and **firebase secret safe** that you can safely commit on Github without a need to scrub it everytime for API keys.

## Notes:

This project has pre-configured routing for authentication and some other basic information that I always use for all of my
single page application. Just though it will be a good idea to develop it as a scafold so anyone can use it as a base for
firebase linked projects.

No firestore element is accesible without an anonymous login to protect the data so you don't have to by-pass the rules for it

## Step 1 of 5

create environment variable by the name APIKEY and it's value with Firebase APIKEY (you can also define a seperate key for production). This variable will be used by "config.index.ts" file to generate the environment file will all the neccesary secret keys.

## To Run

```bash
npm start
```

## To Build for Development

```bash
npm build
```

## To Build for Production

```bash
npm build-prod
```
