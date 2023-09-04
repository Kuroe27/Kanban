import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendHttpRequest } from "./authSlice";

export const API_URL =
  import.meta.env.VITE_ENV !== "development"
    ? "https://www.api.kanbanflow.tech/api/status"
    : "http://localhost:3000/api/status";
export interface Status {
  _id: string;
  statusName: string;
}
const createStatusMutation = () => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (statusName: Status) => {
      const resData = await sendHttpRequest("post", `${API_URL}`, statusName);
      return resData;
    },
    onSuccess: () => {
      // Trigger a refetch of the status data after a successful mutation
      queryClient.invalidateQueries(["status"]);
      toast("Status created successfully");
    },
  });

  return createMutation;
};

const deleteStatusMutation = () => {
  return useMutation({
    mutationFn: async (statusId: string) => {
      const resData = await sendHttpRequest(
        "delete",
        `${API_URL}/${statusId}`,
        null
      );
      return resData;
    },
    onSuccess(resData) {
      toast(resData.message);
    },
  });
};

const getStatus = () => {
  return useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const resData = await sendHttpRequest("get", `${API_URL}`, null);
      return resData;
    },
  });
};

export default {
  createStatusMutation,
  getStatus,
  deleteStatusMutation,
};
