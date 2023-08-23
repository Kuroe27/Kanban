import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiSlice from "../services/auth/apiSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = apiSlice.loginMutation();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    loginMutation.mutateAsync(user);
  };
  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate("/");
    }
  }, [loginMutation.isSuccess, navigate]);
  return (
    <div className="min-h-[100vh]">
      <form className="  text-gray-300 p-10">
        <div className="flex flex-col justify-center items-center min-h-[100vh] ">
          <h1 className="text-3xl text-gray-50 my-5  font-semibold ">
            Login to KanbanFlow
          </h1>

          <div className="div max-w-[320px] mb-52">
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
              <>
                <button
                  disabled
                  type="button"
                  className="text-lg w-full p-2 rounded-lg mb-2  mr-2 font-medium justify-center text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-gray-700 focus:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="white"
                    />
                  </svg>
                  Logging in...
                </button>
              </>
            ) : (
              <button
                className=" bg-gray-100 text-lg w-full p-2 rounded-lg mb-2 text-gray-900"
                onClick={handleSubmit}
              >
                Login
              </button>
            )}

            <button className=" bg-gray-100 text-lg  w-full p-2 rounded-lg mb-2  text-gray-900">
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
