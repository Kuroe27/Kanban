import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type TodoProps = {
  id: string;
  text: string;
  status: string;
};

export type StatusProps = {
  id: string;
  name: string;
};

export type ModalProps = {
  id: string;
  activateModal?: boolean;
  deleteFunction?: string;
};

export type EditStatusProps = {
  id?: string;
  showNotice?: boolean;
  showSpan?: boolean;
};

type Actions = {
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => void;
  setDraggedTodo: (id: string | null) => void;
  updateStatus: (id: string, newStatus: string) => void;
  createStatus: (name: string) => void;
  deleteStatus: (id: string) => void;
  updateStatusName: (id: string, newStatus: string) => void;
  openModal: (modal: ModalProps) => void;
  setEditStatus: (editStatus: EditStatusProps) => void;
};

type TodoStore = {
  todos: TodoProps[] | [];
  status: StatusProps[] | [];
  modal: ModalProps;
  editStatus: EditStatusProps;
  draggedTodo: null | string;
};

const useStore = create<TodoStore & Actions>()(
  devtools((set) => ({
    todos: [
      {
        id: uuidv4(),
        text: "ads",
        status: "Done",
      },
    ],
    status: [
      {
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
      },
    ],
    draggedTodo: null,
    modal: {
      id: "",
      activateModal: false,
      deleteFunction: "",
    },
    editStatus: {
      id: "",
      showNotice: false,
      showSpan: false,
    },
    addTodo: (text) => {
      set(
        (state) => ({
          todos: [...state.todos, { id: uuidv4(), text, status: "Todo" }],
        }),
        false,
        "Todo added"
      );
    },
    deleteTodo: (id) => {
      set(
        (state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }),
        false,
        "Todo deleted"
      );
    },
    updateTodo: (id, newText) => {
      set(
        (state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          ),
        }),
        false,
        "updated"
      );
    },
    setDraggedTodo: (id) => set({ draggedTodo: id }),
    updateStatus: (id, status) => {
      set(
        (state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, status } : todo
          ),
        }),
        false,
        "status updated"
      );
    },
    createStatus: (name) => {
      set(
        (state) => ({
          status: [...state.status, { id: uuidv4(), name }],
        }),
        false,
        "New column create successfully"
      );
    },
    deleteStatus: (id) => {
      set(
        (state) => ({
          status: state.status.filter((s) => s.id !== id),
        }),
        false,
        "columnDeleted"
      );
    },
    updateStatusName: (id, newStatus) => {
      set(
        (state) => ({
          status: state.status.map((s) =>
            s.id === id ? { ...s, name: newStatus } : s
          ),
          todos: state.todos.map((todo) =>
            todo.status === state.status.find((s) => s.id === id)?.name
              ? { ...todo, status: newStatus }
              : todo
          ),
        }),
        false,
        "update status name"
      );
    },
    openModal: (modal) => {
      set(
        (state) => ({
          modal: {
            ...state.modal,
            ...modal,
          },
        }),
        false,
        "Open Modal"
      );
    },
    setEditStatus: (editStatus) => {
      set(
        (state) => ({
          editStatus: {
            ...state.editStatus,
            ...editStatus,
          },
        }),
        false,
        "edit"
      );
    },
  }))
);

export default useStore;
