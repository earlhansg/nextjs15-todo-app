# My To-Do App

A minimal, full-stack to-do application built with Next.js 15 App Router and Tailwind CSS v4. All mutations are handled through Server Actions — no separate API routes needed.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Hosting | [Vercel](https://vercel.com/) |

## Features

- **Create** todos with a single inline form at the top of the list
- **Edit** any todo's name and completion status via a modal
- **Delete** todos with a confirmation modal
- Server Actions for all mutations — no client-side fetch calls
- Clean, minimal UI inspired by Linear / Notion

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
  actions/todo.ts       # Server Actions (create, update, delete)
  components/
    AddTodoForm.tsx     # Inline create form (client)
    TodoList.tsx        # List with edit/delete triggers (client)
    EditModal.tsx       # Edit modal overlay (client)
    DeleteModal.tsx     # Delete confirmation modal (client)
  page.tsx              # Home page (server component)
  layout.tsx            # Root layout
  globals.css           # Tailwind v4 + CSS variables
db/
  todo.ts               # Mock in-memory database
```

## ⚠️ Mock Database Limitation

`db/todo.ts` is an **in-memory array** used as a stand-in for a real database. It works perfectly for local development and demos.

On Vercel (and any serverless platform), each Server Action runs in a short-lived function instance. The module-level array resets to its seed data on every cold start, so **changes do not persist across serverless invocations**.

To add real persistence, replace `db/todo.ts` with a database client (e.g. [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Supabase](https://supabase.com/), or [PlanetScale](https://planetscale.com/)).
