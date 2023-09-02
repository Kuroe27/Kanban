import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
const API_URL =
  import.meta.env.VITE_ENV !== "development"
    ? "https://www.api.kanbanflow.tech/api/users"
    : "http://localhost:3000/api/users";

interface user {
  email: string;
  password: string;
}

interface newUser {
  name?: string;
  email?: string;
  password?: string;
}

const loginMutation = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user: user) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await axios.post(`${API_URL}/login`, user, {
          withCredentials: true,
        });

        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          return res.data;
        }
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`Login error: ${message}`);
        throw error;
      }
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/");
    },
  });
};

const signupMutation = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (newUser: newUser) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await axios.post(`${API_URL} `, newUser);
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          return res.data;
        }
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`Signup error: ${message}`);
        throw error;
      }
    },
    onSuccess: (data) => {
      setUser(data);
      navigate("/");
    },
  });
};
const logoutMutation = () => {
  const { logoutUser } = useStore();

  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post(`${API_URL}/logout`, null, {
          withCredentials: true,
        });

        const { message } = res.data;
        toast(message);
        return res;
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`Signup error: ${message}`);
        throw error;
      }
    },
    onSuccess: () => {
      navigate("/login");
      logoutUser();
    },
  });
};

const UpdateMutation = () => {
  const { setUser } = useStore();

  return useMutation({
    mutationFn: async (user: newUser) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await axios.put(`${API_URL}/updateuser`, user, {
          withCredentials: true,
        });

        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          return res.data;
        }
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`Login error: ${message}`);
        throw error;
      }
    },
    onSuccess: (data) => {
      setUser(data);
      toast(data.message);
    },
  });
};
const apiSlice = {
  loginMutation,
  signupMutation,
  logoutMutation,
  UpdateMutation,
};

export default apiSlice;
