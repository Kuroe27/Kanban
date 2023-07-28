import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

export type TodoProps = {
  id: string, 
  text: string,
  status: string
}

interface TodoStore {
  todos: TodoProps[] | [],
  draggedTodo: null | string ,
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, newText: string) => void
  setDraggedTodo: (id: string | null) => void
  updateStatus: (id: string, newStatus: string) => void // Change the parameter name to "newStatus"
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
  updateStatus: (id, status) => {
    set((state) => ({
      todos: state.todos.map((todo) => 
        todo.id === id ? { ...todo, status} : todo
      ),
    }), false, "status updated");
  }
})));

export default useStore;
