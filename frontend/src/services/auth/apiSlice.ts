import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
const API_URL = "https://kanban-kuroe27.vercel.app/api/users";

interface user {
  email: string;
  password: string;
}

interface newUser {
  userName: string;
  email: string;
  password: string;
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

        const res = await axios.post(`${API_URL}/signup`, newUser);
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

const apiSlice = {
  loginMutation,
  signupMutation,
};

export default apiSlice;
