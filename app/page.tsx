import { todos } from "@/db/todo";
import TodoList from "@/app/components/TodoList";
import AddTodoForm from "@/app/components/AddTodoForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-16">
      <div className="mx-auto w-full max-w-xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            My To-Do App
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            {todos.filter((t) => !t.isDone).length} tasks remaining
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <AddTodoForm />
          <TodoList todos={todos} />
        </div>

        {/* Footer count */}
        <p className="mt-4 text-center text-xs text-neutral-400">
          {todos.filter((t) => t.isDone).length} of {todos.length} completed &middot; {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
