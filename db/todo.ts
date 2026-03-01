export type Todo = {
  id: string;
  name: string;
  isDone: boolean;
};

/**
 * MOCK / DEMO DATABASE
 *
 * This is an in-memory array that acts as a stand-in for a real database.
 * It is intentionally simple so the project can run with zero external
 * dependencies.
 *
 * ⚠️  Serverless limitation:
 * On platforms like Vercel each Server Action runs inside a short-lived
 * serverless function.  The module-level array is re-initialised from the
 * seed data on every cold start, so mutations (create / edit / delete) only
 * survive within a single warm function instance and are lost when the
 * instance is recycled.
 *
 * To make data truly persistent, replace this array with a real database
 * (e.g. Vercel Postgres, PlanetScale, Supabase, or any other provider).
 */
export const todos: Todo[] = [
  { id: "1", name: "Buy groceries", isDone: false },
  { id: "2", name: "Washing dishes", isDone: true },
  { id: "3", name: "Read for 30 minutes", isDone: false },
  { id: "4", name: "Go for a walk", isDone: true },
  { id: "5", name: "Review pull requests", isDone: false },
  { id: "6", name: "Write weekly summary", isDone: false },
];
