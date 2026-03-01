"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { X } from "lucide-react";
import type { Todo } from "@/db/todo";
import { updateTodo } from "@/app/actions/todo";

type Props = {
  todo: Todo;
  onClose: () => void;
};

export default function EditModal({ todo, onClose }: Props) {
  const [name, setName] = useState(todo.name);
  const [isDone, setIsDone] = useState(todo.isDone);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and trap Escape key
  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    startTransition(async () => {
      await updateTodo(todo.id, trimmed, isDone);
      onClose();
    });
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-neutral-200 animate-in fade-in zoom-in-95 duration-150">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-900">Edit task</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-medium text-neutral-500">
            Task name
          </label>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900/5"
          />
        </div>

        {/* isDone toggle */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5">
          <span className="text-sm text-neutral-700">Mark as completed</span>
          <button
            role="switch"
            aria-checked={isDone}
            onClick={() => setIsDone((v) => !v)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
              isDone ? "bg-emerald-500" : "bg-neutral-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition-transform ${
                isDone ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending || !name.trim()}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
