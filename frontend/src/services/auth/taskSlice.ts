import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendHttpRequest } from "./authSlice";
import useStore from "../../store";

// Define the API URL based on the environment
export const API_URL =
  import.meta.env.VITE_ENV !== "development"
    ? "https://www.api.kanbanflow.tech/api/task"
    : "http://localhost:3000/api/task";

// Define the Task interface
export interface Task {
  status?: string;
  taskName?: string;
  _id?: string;
}

// Create a mutation for creating a new task
const createTaskMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (task: Task) => {
      // Make a POST request to create a task
      const resData = await sendHttpRequest("post", `${API_URL}`, task);
      return resData;
    },

    onMutate: async (task) => {
      // Cancel all ongoing task queries
      await queryClient.cancelQueries(["task"]);

      // Get the previous task data
      const prevTask = queryClient.getQueryData<Task[]>(["task"]);

      // Update the task data optimistically
      queryClient.setQueryData(["task"], (old: Task[] | undefined) =>
        old ? [...old, task] : [task]
      );

      return { prevTask };
    },

    onError: (context: any) => {
      // Rollback to the previous task data in case of an error
      queryClient.setQueryData(["task"], context.prevTask);
    },

    onSuccess: () => {
      // Trigger a refetch of the task data after a successful creation
      queryClient.invalidateQueries(["task"]);
    },
  });

  return createMutation;
};

// Create a mutation for deleting a task
const deleteTaskMutation = () => {
  // Get the open modal function from the store
  const { openModal } = useStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      // Make a DELETE request to delete a task
      const resData = await sendHttpRequest(
        "delete",
        `${API_URL}/${taskId}`,
        null
      );
      return resData;
    },

    onMutate: async (taskId: string) => {
      // Cancel ongoing task queries
      await queryClient.cancelQueries(["task"]);

      // Get the previous task data
      const prevTask = queryClient.getQueryData<Task[]>(["task"]);

      // Filter out the deleted task from the data
      const updatedTask = prevTask?.filter((task) => task._id !== taskId);

      // Update the task data in the cache
      queryClient.setQueryData(["task"], updatedTask);

      // Close the modal after deletion
      openModal({
        id: "",
        activateModal: false,
        deleteFunction: "",
      });

      return { prevTask };
    },

    onError: (context: any) => {
      // Rollback to the previous task data in case of an error
      queryClient.setQueryData(["task"], context.prevTask);
    },

    onSuccess: () => {
      // Trigger a refetch of the task data after a successful deletion
      queryClient.invalidateQueries(["task"]);
    },
  });
};

// Create a mutation for updating a task
const updatedTaskMutation = () => {
  // Get the selected task from the store
  const { draggedTodo } = useStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updateTask: Task) => {
      // Return null if there's no selected task
      if (!draggedTodo) {
        return null;
      }

      // Make a PUT request to update the task
      const resData = await sendHttpRequest(
        "put",
        `${API_URL}/${draggedTodo._id}`,
        { taskName: updateTask.taskName, status: updateTask.status }
      );

      return resData;
    },

    onSuccess: () => {
      // Trigger a refetch of the task data after a successful update
      queryClient.invalidateQueries(["task"]);
    },
  });

  return updateMutation;
};

// Create a mutation for updating a task's status
const updatedTaskStatusMutation = () => {
  // Get the selected task from the store
  const { draggedTodo } = useStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (updateTask: Task) => {
      // Return null if there's no selected task
      if (!draggedTodo) {
        return null;
      }

      // Make a PUT request to update the task's status
      const resData = await sendHttpRequest(
        "put",
        `${API_URL}/${draggedTodo._id}`,
        { taskName: updateTask.taskName, status: updateTask.status }
      );

      return resData;
    },

    onMutate: async (updatedTodo) => {
      // Cancel any outgoing refetches to prevent overwriting optimistic update
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
    },
  });

  return updateMutation;
};

// Create a query to fetch task data
const getTask = () => {
  // Get the setTask function from the store
  const { setTask } = useStore();

  return useQuery({
    // Set up the task query key
    queryKey: ["task"],
    // Make a GET request to fetch all tasks
    queryFn: async () => {
      const resData = await sendHttpRequest("get", `${API_URL}`, null);
      return resData;
    },

    // If successful, save/set the task data in the store
    onSuccess: (resData) => {
      setTask(resData);
    },
  });
};

// Export the functions
export default {
  createTaskMutation,
  getTask,
  deleteTaskMutation,
  updatedTaskMutation,
  updatedTaskStatusMutation,
};
