// Import necessary dependencies and libraries
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../../store";

// Define the API URL based on the environment
const API_URL =
  import.meta.env.VITE_ENV !== "development"
    ? "https://www.api.kanbanflow.tech/api/users"
    : "http://localhost:3000/api/users";

// Define TypeScript interfaces for user-related data
interface User {
  email: string;
  password: string;
}

interface NewUser {
  name?: string;
  email?: string;
  password?: string;
}

interface Password {
  password: string;
  newPassword: string;
}

// Function to handle API errors and display toast messages
export const handleApiError = (error: any) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  toast.error(`Error: ${message}`);
  throw error;
};

// Function to send HTTP requests using Axios
export const sendHttpRequest = async (
  method: string,
  url: string,
  data?: any
) => {
  try {
    // Simulate a delay for testing purposes
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await axios({ method, url, data, withCredentials: true });
    return res.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

// Define a mutation for user login
const loginMutation = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user: User) => {
      const resData = await sendHttpRequest("post", `${API_URL}/login`, user);
      if (resData) {
        localStorage.setItem("user", JSON.stringify(resData));
        setUser(resData);
      }
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};

// Define a mutation for user signup
const signupMutation = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newUser: NewUser) => {
      const resData = await sendHttpRequest("post", API_URL, newUser);

      if (resData) {
        localStorage.setItem("user", JSON.stringify(resData));
        setUser(resData);
      }
    },
    onSuccess: () => {
      navigate("/");
    },
  });
};

// Define a mutation for user logout
const logoutMutation = () => {
  const { logoutUser } = useStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const resData = await sendHttpRequest("post", `${API_URL}/logout`, null);

      toast(resData.message);
      return resData;
    },
    onSuccess: () => {
      navigate("/login");
      logoutUser();
    },
  });
};

// Define a mutation for updating user data
const UpdateMutation = () => {
  const { setUser } = useStore();

  return useMutation({
    mutationFn: async (user: NewUser) => {
      const resData = await sendHttpRequest(
        "put",
        `${API_URL}/updateuser`,
        user
      );

      if (resData) {
        localStorage.setItem("user", JSON.stringify(resData));
        setUser(resData);
        toast(resData.message);
      }
    },
  });
};

// Define a mutation for updating user password
const UpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: async (password: Password) => {
      const resData = await sendHttpRequest(
        "put",
        `${API_URL}/updatepassword`,
        password
      );
      toast(resData.message);
    },
  });
};
const DeleteMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const resData = await sendHttpRequest("delete", `${API_URL}/user`, null);
      toast(resData.message);
    },
  });
};

// Export all the mutations as an object
export default {
  loginMutation,
  signupMutation,
  logoutMutation,
  UpdateMutation,
  UpdatePasswordMutation,
  DeleteMutation,
};
