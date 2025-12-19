import React from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  isEditing: boolean;
  editText: string;
  setEditText: (text: string) => void;
  updateTodo: (id: number) => void;
  cancelEdit: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  editTodo,
  isEditing,
  editText,
  setEditText,
  updateTodo,
  cancelEdit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTodo(todo.id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 p-3 mb-2 bg-white rounded-lg shadow-sm border border-blue-300">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
        <button
          onClick={() => updateTodo(todo.id)}
          className="px-3 py-1 text-lg text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
          title="Save"
        >
          <i className="light-icon-check"></i>
        </button>
        <button
          onClick={cancelEdit}
          className="px-3 py-1 text-lg text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title="Cancel"
        >
          <i className="light-icon-x"></i>
        </button>
      </div>
    );
  }

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
      <div className="flex gap-2">
        <button
          onClick={() => editTodo(todo.id)}
          className="px-3 py-1 text-lg text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
          title="Edit todo"
        >
          <i className="light-icon-edit"></i>
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="px-3 py-1 text-lg text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
          title="Delete todo"
        >
          <i className="light-icon-trash"></i>
        </button>
      </div>
    </div>
  );
};
