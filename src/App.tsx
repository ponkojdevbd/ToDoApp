import { useState } from "react";
import type { Todo } from "./types";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setEditingId(id);
      setEditText(todo.text);
    }
  };

  const updateTodo = (id: number) => {
    if (!editText.trim()) return;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-10 px-4">
      <div className="max-w-md mx-auto bg-white/90 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My ToDo List
        </h1>

        <form onSubmit={addTodo} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={startEditTodo}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          updateTodo={updateTodo}
          cancelEdit={cancelEdit}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          {todos.length} {todos.length === 1 ? "task" : "tasks"} total
        </div>
      </div>
      <footer className="mt-6 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} Ponkoj Mondol. All rights reserved.
        <div className="mt-2 text-xl flex justify-center gap-4">
          <a
            href="https://www.github.com/ponkojdevbd"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <i className="light-icon-brand-github"></i>
          </a>

          <a
            href="https://www.ponkojmondol.top"
            target="_blank"
            rel="noopener noreferrer"
            title="Portfolio"
          >
            <i className="light-icon-world"></i>
          </a>

          <a
            href="https://www.facebook.com/ponkoj.mondol.bd"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
          >
            <i className="light-icon-brand-facebook"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
