import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendHttpRequest } from "./authSlice";
import useStore from "../../store";

// Define the API URL based on the environment
export const API_URL =
  import.meta.env.VITE_ENV !== "development"
    ? "https://www.api.kanbanflow.tech/api/status"
    : "http://localhost:3000/api/status";

// Define the Status interface
export interface Status {
  _id?: string;
  statusName: string;
}

// Create a mutation for creating a new status
const createStatusMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (statusName: Status) => {
      const resData = await sendHttpRequest("post", `${API_URL}`, statusName);
      return resData;
    },
    onMutate: async (statusName) => {
      // Cancel any ongoing status queries
      await queryClient.cancelQueries(["status"]);

      const prevStatus = queryClient.getQueryData<Status[]>(["status"]);

      // Update the status data in the cache
      queryClient.setQueryData(["status"], (old: Status[] | undefined) =>
        old ? [...old, statusName] : [statusName]
      );

      return { prevStatus };
    },
    onError: (context: any) => {
      // Rollback the status data in case of an error
      queryClient.setQueryData(["status"], context.prevStatus);
    },
    onSuccess: () => {
      // Trigger a refetch of the status data after a successful mutation
      queryClient.invalidateQueries(["status"]);
      toast("Status created successfully");
    },
  });

  return createMutation;
};

// Create a mutation for deleting a status
const deleteStatusMutation = () => {
  const { openModal } = useStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (statusId: string) => {
      const resData = await sendHttpRequest(
        "delete",
        `${API_URL}/${statusId}`,
        null
      );
      return resData;
    },
    onMutate: async (statusId: string) => {
      // Cancel any ongoing status queries
      await queryClient.cancelQueries(["status"]);

      const prevStatus = queryClient.getQueryData<Status[]>(["status"]);

      // Update the status data in the cache by removing the deleted status
      const updatedStatus = prevStatus?.filter(
        (status) => status._id !== statusId
      );
      queryClient.setQueryData(["status"], updatedStatus);

      // Close any open modal
      openModal({
        id: "",
        activateModal: false,
        deleteFunction: "",
      });

      return { prevStatus };
    },
    onError: (context: any) => {
      // Rollback the status data in case of an error
      queryClient.setQueryData(["status"], context.prevStatus);
    },
    onSuccess: (resData) => {
      // Trigger a refetch of the status data after a successful deletion
      queryClient.invalidateQueries(["status"]);
      toast(resData.message);
    },
  });
};

// Create a mutation for updating a status
const updatedStatusMutation = () => {
  const { editStatus } = useStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (statusName: Status) => {
      const resData = await sendHttpRequest(
        "put",
        `${API_URL}/${editStatus.id}`,
        statusName
      );
      return resData;
    },
    onMutate: async (statusName) => {
      // Cancel any ongoing status queries for the specific status ID
      await queryClient.cancelQueries(["status", editStatus.id]);

      const prevStatus = queryClient.getQueryData<Status[]>([
        "status",
        editStatus.id,
      ]);

      // Update the status data in the cache
      queryClient.setQueryData(["status", editStatus.id], statusName);

      return { prevStatus, statusName };
    },
    onError: (context: any) => {
      // Rollback the status data in case of an error
      queryClient.setQueryData(
        ["status", context.editStatus.id],
        context.prevStatus
      );
    },
    onSuccess: () => {
      // Trigger a refetch of the status data after a successful mutation
      queryClient.invalidateQueries(["status", ["status", editStatus.id]]);
      toast("Status updated successfully");
    },
  });

  return updateMutation;
};

// Create a query to fetch status data
const getStatus = () => {
  const { setStatus } = useStore();

  return useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const resData = await sendHttpRequest("get", `${API_URL}`, null);
      return resData;
    },
    onSuccess: (resData) => {
      // Update the status in the store
      setStatus(resData);
    },
  });
};

// Export the functions
export default {
  createStatusMutation,
  getStatus,
  deleteStatusMutation,
  updatedStatusMutation,
};
