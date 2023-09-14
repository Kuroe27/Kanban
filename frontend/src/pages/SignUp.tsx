import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiSlice from "../services/auth/authSlice";
import useStore from "../store";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoadingBtn from "../components/Buttons/LoadingBtn";

const SignUp = () => {
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupMutation = apiSlice.signupMutation();
  const [error, setError] = useState(false);
  const [toggleShowPassword, setShowPassword] = useState(false);
  const [toggleShowConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { auth } = useStore();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const newUser = {
        name,
        email,
        password,
      };
      signupMutation.mutateAsync(newUser);
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <div className=" h-[calc(100vh-4rem)] flex justify-center items-center">
      <form className="  text-gray-300 p-10 text-center">
        <div className="flex flex-col justify-center items-center  ">
          <h1 className="text-3xl text-gray-50 my-5  font-semibold ">
            Signup to KanbanFlow
          </h1>

          <div className="div max-w-[320px]">
            <input
              type="text"
              className=" bg-gray-800 border-2 border-gray-200 text-1xl p-2 rounded-md mb-2 w-full "
              placeholder="Username"
              value={name}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              className=" bg-gray-800 border-2 border-gray-200 text-1xl p-2 rounded-md mb-2 w-full "
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full flex items-center bg-gray-800 border-2 border-gray-200  p-1 rounded-md mb-2  justify-between">
              <input
                type={!toggleShowPassword ? "password" : "text"}
                className=" bg-transparent outline-none w-full mr-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!toggleShowPassword ? (
                <AiFillEye
                  className="mr-2"
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setShowPassword(true);
                  }}
                />
              ) : (
                <AiFillEyeInvisible
                  className="mr-2"
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setShowPassword(false);
                  }}
                />
              )}
            </div>

            <div className="w-full flex items-center bg-gray-800 border-2 border-gray-200  p-1 rounded-md mb-2  justify-between">
              <input
                type={!toggleShowConfirmPassword ? "password" : "text"}
                className=" bg-transparent outline-none w-full mr-2"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!toggleShowConfirmPassword ? (
                <AiFillEye
                  className="mr-2"
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setShowConfirmPassword(true);
                  }}
                />
              ) : (
                <AiFillEyeInvisible
                  className="mr-2"
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setShowConfirmPassword(false);
                  }}
                />
              )}
            </div>

            {error ? (
              <p className="text-red-500 text-start mb-2">
                Passwords do not match *
              </p>
            ) : null}

            {signupMutation.isLoading ? (
              <LoadingBtn label="Signing up..." />
            ) : (
              <button
                className=" bg-gray-100 text-lg  w-full p-2 rounded-lg mb-2  text-gray-900"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            )}
            <a
              onClick={() => navigate("/login")}
              className="w-full hover:cursor-pointer hover:text-gray-50"
            >
              Already have an account?{" "}
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
