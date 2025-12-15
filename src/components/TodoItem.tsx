import React from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm border ${
        todo.completed ? "border-green-200 bg-green-50" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />
        <span
          className={`text-lg ${
            todo.completed ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
      >
        Delete
      </button>
    </div>
  );
};
