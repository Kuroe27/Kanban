import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

const useStore = create(devtools((set) => ({
  todos: [],
  addTodo: (text) => {
    set((state) => ({ todos: [...state.todos, { id: uuidv4(), text, status: 'todo' }] }), false, "Todo added");
  },
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }), false, "Todo deleted");
  },
  updateTodo: (index, newText) => {
    set((state) => {
      const updatedTodo = [...state.todos];
      updatedTodo[index] = { ...updatedTodo[index], text: newText };
      return { todos: updatedTodo };
    });
  }
})));

export default useStore;
