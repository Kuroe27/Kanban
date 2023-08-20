const Login = () => {
  return (
    <div className="container h-[100vh] w-full flex justify-center items-center text-center ">
      <form className=" h-1/2 w-1/2 px-10 ">
        <h1 className="text-3xl text-gray-50 my-5  font-semibold ">
          Login to KanbanFlow
        </h1>

        <div className="flex flex-col ">
          <input
            type="text"
            className="w-full bg-gray-200 border-2 border-gray-700 text-2xl p-1 rounded-md mb-2"
            placeholder="Email"
          />
          <input
            type="text"
            className="w-full bg-gray-200 border-2 border-gray-700 text-2xl p-1 rounded-md  mb-4"
            placeholder="Password"
          />
          <button className=" bg-gray-100 text-lg w-full p-1 rounded-lg mb-2">
            Login
          </button>
          <button className=" bg-gray-100 text-lg w-full p-1 rounded-lg mb-2 ">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
