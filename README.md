# MetaStat GraphQL Client

MetaStat is a React, TypeScript and GraphQL client for browsing game data, platforms and statistics. Visitors can explore games and platforms without an account. Logged-in users can also open the statistics dashboard and create, update or delete games.

## Important URLs

- Live application: https://graphqlclient-production.up.railway.app/
- GraphQL API: https://reliable-hope-production-e0b4.up.railway.app/graphql
- GitHub OAuth callback: https://graphqlclient-production.up.railway.app/oauth/callback
- Local frontend: http://localhost:5173
- Local OAuth/API server: http://localhost:3000

## How To Use

Open the live application at:

```text
https://graphqlclient-production.up.railway.app/
```

The start page redirects to the games list. From there you can:

1. Go to **Games** to browse games.
2. Use the filters to search by platform, genre, developer or publisher.
3. Click **Read more** on a game to see more details.
4. Go to **Platforms** to see all available game platforms.
5. Register or log in if you want access to more features.
6. After logging in, open **Dashboard** to view statistics for publishers, developers and platforms.
7. Use **Create** to add a new game.
8. Open a game detail page to update or delete a game.

You can register with username and password, or log in with GitHub if OAuth is configured correctly.

## How To Download Or Fork

### Fork On GitHub

1. Open the repository on GitHub.
2. Click **Fork** in the top-right corner.
3. Choose your own GitHub account.
4. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
cd REPOSITORY_NAME
```

### Download As ZIP

1. Open the repository on GitHub.
2. Click **Code**.
3. Click **Download ZIP**.
4. Extract the ZIP file.
5. Open the extracted folder in your editor.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_GRAPHQL_URL=https://reliable-hope-production-e0b4.up.railway.app/graphql
VITE_REDIRECT_URI=http://localhost:5173/oauth/callback
VITE_GITHUB_CLIENT_ID=your_github_client_id

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CLIENT_URL=http://localhost:5173
PORT=3000
```

Start the development servers:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

The Vite dev server runs the frontend on port `5173`. The Express server runs the GitHub OAuth callback endpoint on port `3000`. The local Vite config proxies `/api` requests to the Express server.

## Available Scripts

```bash
npm run dev
```

Starts the frontend and local Express server for development.

```bash
npm run build
```

Builds the TypeScript project and creates a production build in `dist`.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run start
```

Starts the Express server. This is useful for production deployment because the server handles both OAuth API routes and the built frontend files.

```bash
npm run preview
```

Previews the Vite production build locally.

## Main Routes

- `/` redirects to `/nested-games` should soon be a home page.
- `/games` shows the basic games list
- `/nested-games` shows games with scores and platform data
- `/platforms` shows all platforms
- `/login` lets users log in
- `/register` lets users create an account
- `/dashboard` shows statistics for logged-in users
- `/games/create` lets logged-in users create a game
- `/games/update/:id` lets logged-in users update a game
- `/games/delete/:id` lets logged-in users delete a game
- `/oauth/callback` handles the GitHub login redirect

## Technologies

- React
- TypeScript
- Vite
- Apollo Client
- GraphQL
- Express
- GitHub OAuth
- Railway

## Deployment Notes

For Railway, use:

```bash
npm run build
```

as the build command, and:

```bash
npm run start
```

as the start command.

Make sure the production environment variables match the deployed URLs:

```env
VITE_GRAPHQL_URL=https://reliable-hope-production-e0b4.up.railway.app/graphql
VITE_REDIRECT_URI=https://graphqlclient-production.up.railway.app/oauth/callback
CLIENT_URL=https://graphqlclient-production.up.railway.app
```

The GitHub OAuth app should also use this callback URL:

```text
https://graphqlclient-production.up.railway.app/oauth/callback
```
