import { useEffect, useState } from "react";
import apiSlice from "../services/auth/authSlice";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import LoadingBtn from "../components/Buttons/LoadingBtn";
const Login = () => {
  const navigate = useNavigate();
  const { auth } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = apiSlice.loginMutation();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    loginMutation.mutateAsync(user);
  };

  return (
    <div className=" h-[calc(100vh-4rem)] flex justify-center items-center">
      <form className="  text-gray-300 p-10 text-center flex">
        <div className="flex flex-col justify-center items-center  ">
          <h1 className="text-3xl text-gray-50 my-5  font-semibold ">
            Login to KanbanFlow
          </h1>

          <div className="div max-w-[320px]">
            <input
              type="text"
              className=" bg-gray-800 border-2 border-gray-200 text-1xl p-2 rounded-md mb-2 w-full placeholder-text-xl"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className=" bg-gray-800 border-2 border-gray-200 text-2xl p-1 rounded-md mb-2 w-full placeholder-text-xl"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginMutation.isLoading ? (
              <LoadingBtn label="Logging in..." />
            ) : (
              <button
                className=" bg-gray-100 text-lg w-full p-2 rounded-lg mb-2 text-gray-900"
                onClick={handleSubmit}
              >
                Login
              </button>
            )}

            <a
              onClick={() => navigate("/signup")}
              className="w-full hover:cursor-pointer hover:text-gray-50"
            >
              Don't have an account?{" "}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
