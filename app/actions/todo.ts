"use server";

import { todos } from "@/db/todo";
import { revalidatePath } from "next/cache";

export async function updateTodo(id: string, name: string, isDone: boolean) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  todo.name = name;
  todo.isDone = isDone;

  revalidatePath("/");
}

export async function createTodo(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return;

  todos.push({ id: crypto.randomUUID(), name: trimmed, isDone: false });

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return;

  todos.splice(index, 1);

  revalidatePath("/");
}
