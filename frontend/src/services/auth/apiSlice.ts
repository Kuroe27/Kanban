import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
const API_URL = "https://kanbanflow.onrender.com/api/users";

interface user {
  email: string;
  password: string;
}

const loginMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();

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

const apiSlice = {
  loginMutation,
};

export default apiSlice;
