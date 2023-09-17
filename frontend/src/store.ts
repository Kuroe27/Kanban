import { create } from "zustand";
import { devtools } from "zustand/middleware";
const userRaw = localStorage.getItem("user");
const user = userRaw !== null ? JSON.parse(userRaw) : null;

export type TaskProps = {
  _id?: string;
  taskName?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type StatusProps = {
  _id: string;
  statusName: string;
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

export type AuthProps = {
  id: string;
  name: string;
  email: string;
};
type Actions = {
  setUser: (user: AuthProps) => void;
  logoutUser: () => void;
  updateTodo: (id: string, newText: string) => void;
  setDraggedTodo: (id: TaskProps) => void;
  openModal: (modal: ModalProps) => void;
  setStatus: (status: StatusProps) => void;
  setTask: (task: TaskProps) => void;
  setEditStatus: (editStatus: EditStatusProps) => void;
  setBg: (condition: boolean) => void;
  setSearchQuery: (query: string) => void;
};

type tasktore = {
  auth: AuthProps | null;
  task: TaskProps[] | [];
  status: StatusProps[] | [];
  modal: ModalProps;
  editStatus: EditStatusProps;
  draggedTodo: TaskProps | null;
  Bg: Boolean;
  searchQuery: string;
};

const useStore = create<tasktore & Actions>()(
  devtools((set) => ({
    auth: user,
    task: [],
    status: [],
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
    Bg: false,
    searchQuery: "",
    setUser: (user) => {
      set((state) => ({
        auth: {
          ...state.auth,
          ...user,
        },
      }));
    },
    logoutUser: () => {
      set(() => ({
        auth: null,
      }));
      localStorage.removeItem("user");
    },
    setStatus: (status: any) => {
      set(() => ({
        status,
      }));
    },
    setTask: (task: any) => {
      set(() => ({
        task,
      }));
    },
    updateTodo: (id, newText) => {
      set(
        (state) => ({
          task: state.task.map((task) =>
            task._id === id ? { ...task, text: newText } : task
          ),
        }),
        false,
        "updated"
      );
    },
    setDraggedTodo: (id) => set({ draggedTodo: id }),
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
    setBg: (condition) => {
      set({ Bg: condition });
    },
    setSearchQuery: (query) => {
      set({ searchQuery: query });
    },
  }))
);

export default useStore;
