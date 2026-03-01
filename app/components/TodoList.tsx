"use client";

import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import type { Todo } from "@/db/todo";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type Props = {
  todos: Todo[];
};

export default function TodoList({ todos }: Props) {
  const [editing, setEditing] = useState<Todo | null>(null);
  const [deleting, setDeleting] = useState<Todo | null>(null);

  return (
    <>
      <ul className="divide-y divide-neutral-100">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-neutral-50"
          >
            {/* Done indicator */}
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                todo.isDone
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-neutral-300 bg-white"
              }`}
            >
              {todo.isDone && (
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              )}
            </span>

            {/* Name */}
            <span
              className={`flex-1 text-sm ${
                todo.isDone
                  ? "text-neutral-400 line-through"
                  : "text-neutral-800"
              }`}
            >
              {todo.name}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                aria-label={`Edit "${todo.name}"`}
                onClick={() => setEditing(todo)}
                className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                aria-label={`Delete "${todo.name}"`}
                onClick={() => setDeleting(todo)}
                className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <EditModal todo={editing} onClose={() => setEditing(null)} />
      )}
      {deleting && (
        <DeleteModal todo={deleting} onClose={() => setDeleting(null)} />
      )}
    </>
  );
}
