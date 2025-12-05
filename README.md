# Backend

Express + Sanity backend.
Serves CMS content, listings, and static assets.

---

## 🚀 Development

Start the API locally:

```bash
cd apps/backend
pnpm install
pnpm dev
```

The server will run at http://localhost:3000.

## 📦 Build

Build the TypeScript project into dist/:

```bash
pnpm build
```

Run the built server:

```bash
pnpm start
```

## 🌐 Deployment

This backend is deployed separately to Vercel (not as part of the main monorepo’s Vercel project).

Pushing changes:

1. Commit your changes in the monorepo:

```bash
git add .
git commit -m "chore(api): update backend code"
```

2. Push to the API repo (via subtree split):

```bash
git subtree push --prefix apps/backend backend main
```

ℹ️ If conflicts happen, pull first:

```bash
git subtree pull --prefix apps/backend backend main --squash
```

## 📂 Project Structure

```
apps/backend
├── assets/          # Static assets served via Express
├── dist/            # Compiled output (ignored in git)
├── src/             # Source code
│   └── lib/cms/     # Sanity client, queries, utils
├── index.ts         # Express entrypoint
├── tsconfig.json
└── vercel.json      # Deployment config
```

---
