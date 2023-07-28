import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string, 
  text: string,
  status: string
}

interface TodoStore {
  todos: Todo[] | [],
  draggedTodo: string | null,
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, newText: string) => void
  setDraggedTodo: (id: string) => void
  updateStatus: (draggedId: string, targetId: string) => void
}


const useStore = create<TodoStore>()(devtools((set) => ({
  todos: [{
    id: uuidv4(), 
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
  setDraggedTodo: (id) => set({ draggedTodo: id }), 
  updateStatus: (draggedId, targetId) => {
    set((state) => {
      const todos = [...state.todos];
      const draggedIndex = todos.findIndex((todo) => todo.id === draggedId);
      const targetIndex = todos.findIndex((todo) => todo.id === targetId);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Swap the todos in the array
        [todos[draggedIndex], todos[targetIndex]] = [todos[targetIndex], todos[draggedIndex]];
      }

      return { todos };
    }, false, "status updated");
  }
})));

export default useStore;
