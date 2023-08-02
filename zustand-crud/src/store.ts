import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';

export type TodoProps = {
  id: string, 
  text: string,
  status: string
}

export type StatusProps = {
  id: string, 
  name: string
}

interface TodoStore {
  todos: TodoProps[] | [],
  status: StatusProps[] | [],
  draggedTodo: null | string ,
  todoId:  string,
  activateModal: boolean,
  deleteFunction: string,
  addTodo: (text: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, newText: string) => void
  setDraggedTodo: (id: string | null) => void
  updateStatus: (id: string, newStatus: string) => void 
  createStatus: (name: string) => void 
  deleteStatus: (id: string) => void
  updateStatusName:(id: string, newStatus: string) => void
  openModal: (activateModal: boolean) => void;
  closeModal: (activateModal: boolean) => void;
  setTodoId: (id: string) => void
  setDeleteFunction: (id: string) => void
}


const useStore = create<TodoStore>()(devtools((set) => ({

  
  todos: [{
    id: uuidv4(), 
    text: "ads",
    status: "Done",
  }],
  status:[{
    id: uuidv4(), 
    name: "Todo",
  },
  {
    id: uuidv4(), 
    name: "Ongoing",
  },
  {
    id: uuidv4(), 
    name: "Done",
  }],
  draggedTodo: null,
  todoId: "",
  activateModal: false,
  deleteFunction: "",
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
  },
  createStatus:(name) => {
    set((state) => ({
      status: [...state.status, {id: uuidv4(), name}]
    }), false, "New column create successfully")
  },
  deleteStatus: (id) => {
    set((state) => ({
      status: state.status.filter(s => s.id !== id),
    }),false, "columnDeleted")
  },
  updateStatusName: (id, newStatus) => {
    set((state) => ({
      status: state.status.map((s) =>
        s.id === id ? { ...s, name: newStatus } : s
      ),
      todos: state.todos.map((todo) =>
        todo.status === state.status.find((s) => s.id === id)?.name
          ? { ...todo, status: newStatus }
          : todo
      ),
    }));
  },
  
  openModal: () => {
    set({ activateModal: true});
  },
  closeModal: () => {
    set({ activateModal: false });
  },
  setTodoId: (id) => {
    set({todoId: id})
  },
  setDeleteFunction: (deleteFunc) => {
    set({deleteFunction: deleteFunc})
  }
})));

export default useStore;