import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendHttpRequest } from "./authSlice";
import useStore from "../../store";

export const API_URL =
  import.meta.env.VITE_ENV !== "development"
    ? "https://www.api.kanbanflow.tech/api/task"
    : "http://localhost:3000/api/task";
export interface Task {
  status: string;
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
};
