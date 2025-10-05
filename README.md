# Full-Stack Todo App (Next.js + Tailwind + Prisma + MongoDB)

A simple full-stack TODO application built with Next.js (App Router), styled with Tailwind CSS, authenticated using Clerk, and backed by Prisma + MongoDB.  
Form validation uses **zod** + **react-hook-form**. The app supports light/dark themes via **next-themes**. Todos are tied to Clerk users (userId) and persisted with Prisma (MongoDB).

---

## Features

- Sign up / Sign in with **Clerk**.
- Create, read, update, delete todos (CRUD) — each todo attached to the authenticated user.
- Form validation with **zod** and **react-hook-form**.
- Dark / Light mode using **next-themes** and a UI toggle (ModeToggle).
- Clean UI using **Tailwind CSS** and reusable UI components.
- Prisma schema for `Todo` model stored in MongoDB.
- Server actions (Next.js App Router) to create/update/delete todos and revalidate the index.

---

## Tech Stack

- Next.js (App Router)
- React (client components + server actions)
- Tailwind CSS
- Prisma ORM (MongoDB connector)
- MongoDB (Atlas or self-hosted)
- Clerk (authentication)
- zod + react-hook-form (validation)
- Lucide icons, shadcn/ui (optional UI primitives)

---

## Repository Structure (high level)

```
/app
  /(components)
  /api (server actions)
  layout.tsx (RootLayout with ClerkProvider, ThemeProvider, ContextProvider)
  page.tsx (Home)
components/
  AddDialogOpen.tsx
  TodoForm.tsx
  TodosTable.tsx
  ModeToggle.tsx
lib/
  prisma.ts  (Prisma client)
providers/
  ContextProvider.tsx
  ThemeProvider.tsx
prisma/
  schema.prisma
.next/
public/
```

---

## Quickstart (local)

### 1. Clone repository
```bash
git clone https://github.com/<your-username>/<repo>.git
cd <repo>
```

### 2. Install dependencies
```bash
npm install
# or
yarn
```

### 3. Environment variables

Create a `.env` file in the project root (do **not** commit `.env`).

Create a `.env.local` or `.env` with these variables:

```env
# MongoDB (MongoDB connection string)
DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"

# Clerk (authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_CLERK_FRONTEND_API=xxxxx
CLERK_SECRET_KEY=sk_test_xxx

# Next (optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> Replace placeholders with your real credentials from MongoDB Atlas and Clerk Dashboard.

### 4. Prisma & database (MongoDB)

Generate Prisma client and push schema to your MongoDB database (for MongoDB we use `db push` rather than `migrate`):

```bash
npx prisma generate
npx prisma db push
```

> `prisma db push` syncs your Prisma schema to the database (suitable for MongoDB workflows). If you later need migrations for SQL DBs, use Prisma Migrate — but for MongoDB `db push` is the proper approach for schema prototyping / deploying changes.

### 5. Run the dev server
```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:3000`.

---

## Prisma Schema (example `prisma/schema.prisma`)

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  completed   Boolean  @default(false)
  userId      String
  createdAt   DateTime @default(now())
}
```

---

## How authentication & todos work

- Clerk manages user sessions and provides `user.id`.
- On form submit (TodoForm), the server action `CreateTodoAction` / `UpdateTodoAction` is called with the `userId` (from Clerk) and saved to MongoDB through Prisma.
- Server actions call `revalidatePath("/")` to refresh the home page after mutations.

---

## Form validation

- Validation schema defined with **zod** (e.g., `formSchema`) and used via `zodResolver` from `@hookform/resolvers/zod`.
- `react-hook-form` handles form state and submission; errors are displayed via your UI form components.

---

## Deployment

1. Set up your environment variables in the hosting service (Vercel, Netlify, Render, etc.), matching the `.env` keys above.
2. Ensure `DATABASE_URL` points to your production MongoDB cluster.
3. Add Clerk keys in the host's environment settings:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_CLERK_FRONTEND_API`
   - `CLERK_SECRET_KEY`
4. Build & deploy:
```bash
npm run build
npm start
```
(When deploying on Vercel the default build command `npm run build` and output `next build` are used automatically.)

---

## Troubleshooting

- If Clerk complains about a missing publishable key, ensure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `NEXT_PUBLIC_CLERK_FRONTEND_API` are set in your deployment environment.
- For Prisma + MongoDB, use `npx prisma db push` to apply the Prisma schema to the DB. If you hit issues with `db push`, check your `DATABASE_URL` and Prisma version.
- If you accidentally lose local commits during git operations (rebase/push), use `git reflog` to recover previous commits.

---

## Scripts

Typical package.json scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:generate": "prisma generate",
  "prisma:push": "prisma db push"
}
```

---

## Future improvements / TODOs

- Add pagination / filtering for todos.
- Add optional due-dates and reminders.
- Add UI tests and unit tests.
- Add end-to-end tests with Playwright or Cypress.

---

## License & Contact

MIT License — feel free to reuse and adapt.  
If you want to reach me: `Mohamed` (your contact info / LinkedIn).
