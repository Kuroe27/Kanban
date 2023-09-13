import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendHttpRequest } from "./authSlice";
import useStore from "../../store";

export const API_URL =
  import.meta.env.VITE_ENV !== "development"
    ? "https://www.api.kanbanflow.tech/api/task"
    : "http://localhost:3000/api/task";
export interface Task {
  status?: string;
  taskName?: string;
  _id?: string;
}

const createTaskMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (task: Task) => {
      const resData = await sendHttpRequest("post", `${API_URL}`, task);
      return resData;
    },
    onMutate: async (task) => {
      await queryClient.cancelQueries(["task"]);

      const prevTask = queryClient.getQueryData<Task[]>(["task"]);

      queryClient.setQueryData(["task"], (old: Task[] | undefined) =>
        old ? [...old, task] : [task]
      );

      return { prevTask };
    },
    onError: (context: any) => {
      queryClient.setQueryData(["task"], context.prevTask);
    },
    onSuccess: () => {
      // Trigger a refetch of the task data after a successful mutation
      queryClient.invalidateQueries(["task"]);
      toast("Task created successfully");
    },
  });

  return createMutation;
};

const deleteTaskMutation = () => {
  const { openModal } = useStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: string) => {
      const resData = await sendHttpRequest(
        "delete",
        `${API_URL}/${taskId}`,
        null
      );
      return resData;
    },
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries(["task"]);

      const prevTask = queryClient.getQueryData<Task[]>(["task"]);
      const updatedTask = prevTask?.filter((task) => task._id !== taskId);
      queryClient.setQueryData(["task"], updatedTask);
      openModal({
        id: "",
        activateModal: false,
        deleteFunction: "",
      });
      return { prevTask };
    },
    onError: (context: any) => {
      queryClient.setQueryData(["task"], context.prevTask);
    },
    onSuccess: (resData) => {
      queryClient.invalidateQueries(["task"]);

      toast(resData.message);
    },
  });
};

const updatedTaskMutation = () => {
  const { draggedTodo } = useStore();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async (updateTask: Task) => {
      if (!draggedTodo) {
        return null;
      }

      const resData = await sendHttpRequest(
        "put",
        `${API_URL}/${draggedTodo._id}`,
        { taskName: updateTask.taskName, status: updateTask.status }
      );
      return resData;
    },
    onMutate: async (updatedTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["task"]);

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Task[]>(["task"]);

      // Optimistically update to the new value
      if (previousTodos && draggedTodo) {
        const newTodos: Task[] = previousTodos.map((item) => {
          if (item._id === draggedTodo._id) {
            return {
              ...updatedTodo,
              taskName: draggedTodo.taskName,
              _id: draggedTodo._id,
            };
          } else return item;
        });
        queryClient.setQueryData<Task[]>(["task"], newTodos);
      }

      // Return a context object with the snapshotted value
      return { previousTodos };
    },

    onError: (context: any) => {
      queryClient.setQueryData(["task"], context.previousTodos);
    },
    onSuccess: () => {
      // Trigger a refetch of the task data after a successful mutation
      queryClient.invalidateQueries(["task"]);
      toast("Task updated successfully");
    },
  });

  return updateMutation;
};

const getTask = () => {
  const { setTask } = useStore();

  return useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const resData = await sendHttpRequest("get", `${API_URL}`, null);
      return resData;
    },
    onSuccess: (resData) => {
      setTask(resData);
      toast("success");
    },
  });
};

export default {
  createTaskMutation,
  getTask,
  deleteTaskMutation,
  updatedTaskMutation,
};
