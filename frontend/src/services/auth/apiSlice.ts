import axios from "axios";

const API_URL = "https://localhost:3000/api/users";

const login = async (userData: any) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
const apiSlice = {
  login,
};

export default apiSlice;
