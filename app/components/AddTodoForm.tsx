"use client";

import { useRef, useTransition } from "react";
import { Plus } from "lucide-react";
import { createTodo } from "@/app/actions/todo";

export default function AddTodoForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = inputRef.current?.value.trim() ?? "";
    if (!name) return;

    startTransition(async () => {
      await createTodo(name);
      if (inputRef.current) inputRef.current.value = "";
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="What needs to be done?"
        disabled={isPending}
        className="flex-1 bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-1 rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus className="h-3.5 w-3.5" />
        Add
      </button>
    </form>
  );
}
