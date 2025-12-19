import React from "react";
import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  editingId: number | null;
  editText: string;
  setEditText: (text: string) => void;
  updateTodo: (id: number) => void;
  cancelEdit: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
  editingId,
  editText,
  setEditText,
  updateTodo,
  cancelEdit,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          isEditing={editingId === todo.id}
          editText={editText}
          setEditText={setEditText}
          updateTodo={updateTodo}
          cancelEdit={cancelEdit}
        />
      ))}
    </div>
  );
};
