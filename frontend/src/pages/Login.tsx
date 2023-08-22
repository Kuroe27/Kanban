const Login = () => {
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
            />
            <input
              type="password"
              className=" bg-gray-800 border-2 border-gray-200 text-2xl p-1 rounded-md mb-2 w-full placeholder-text-xl"
              placeholder="Password"
            />
            <button className=" bg-gray-100 text-lg w-full p-2 rounded-lg mb-2 text-gray-900">
              Login
            </button>
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
