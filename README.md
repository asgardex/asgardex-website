Welcome to the Asgardex.com landing page project repository. 

## Highlights of the Project Setup:

- **Framework**: Utilizes [Next.js 14](https://nextjs.org/), incorporating the latest [App Router](https://nextjs.org/docs) for seamless navigation and optimal user experiences.
- **Language Support**: Fully supports [Typescript 5.2.2](https://www.typescriptlang.org/), allowing for strong typing and advanced JavaScript features.
- **Styling**: Integrated with [Tailwindcss](https://tailwindcss.com/), enabling rapid UI development with utility-first CSS classes.
- **Code Quality**: Includes [Eslint](https://eslint.org/) for consistent code style and bug prevention.
- **Package Management**: Features a pre-configured [npmrc](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc) file for smooth package management.
- **UI Components**: Employs [NextUI](https://nextui.org/) for a sleek and modern component library.
- **Icons**: Uses [Tabler icons](https://tabler-icons.io/) for high-quality, customizable icons.


## Getting Started

First, install dependencies

```bash
yarn install
```
Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


You can also run the project in production mode:

```bash
yarn build
yarn start
```

## Npmrc

To be able to use the Kairos organization packages, the file expects you have defined the `PRIVATE_REPO_TOKEN` environment variable.

*Note: If you dont have the **PRIVATE_REPO_TOKEN** value, contact the administrators*
 
## Linter

Linter has been configured with rules set in the `.eslintrc.json`. To find out the lint problems the project has, run the following command

```bash
yarn lint
```

Run the following command to fix automatically lint problems

```bash
yarn lint --fix
```

*Note: For adding custom folders to lint validation. Update the `next.config.js` file using this [documentation](https://nextjs.org/docs/pages/building-your-application/configuring/eslint)*

## Deployment

The easiest way to deploy Next.js apps is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


