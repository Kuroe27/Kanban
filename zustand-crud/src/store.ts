import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

const useStore = create(devtools((set) => ({
  todos: [{
    id: uuidv4(), // Assign a unique ID to the initial todo
    text: "ads",
    status: "Done",
  }],
  draggedTodo: null,
  addTodo: (text) => {
    set((state) => ({
      todos: [...state.todos, { id: uuidv4(), text, status: 'Todo' }],
    }), false, "Todo added");
  },
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }), false, "Todo deleted");
  },
  updateTodo: (id, newText) => {
    set((state) => ({
      todos: state.todos.map((todo) => 
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    }), false, "updated");
  },
  setDraggedTodo: (id) => set({ draggedTodo: id }), // Update draggedTodo with the todo's id
  updateStatus: (id, status) => {
    set((state) => ({
      todos: state.todos.map((todo) => 
        todo.id === id ? { ...todo, status} : todo
      ),
    }), false, "status updated");
  }
})));

export default useStore;
