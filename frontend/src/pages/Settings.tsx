import useStore from "../store";

const Settings = () => {
  const { auth } = useStore();

  if (!auth) {
    // Handle the case where auth is null or undefined
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen max-w-7xl m-auto text-gray-350 p-10 overflow-auto">
      <div className="box1 w-1/4 my-4 mr-10">
        <h1 className="text-2xl">Settings</h1>
        <div className="mt-5">
          <button className="w-full text-start p-2 rounded-lg hover:text-gray-100 hover:bg-gray-500">
            Account
          </button>
        </div>
      </div>
      <main className="w-3/4">
        <div className="about py-2">
          <h1 className="text-4xl text-white py-2 text font-light">About</h1>
          <span className="font-extralight text-gray-400">
            Set your profile name and details. Providing additional information
            like your real name can help friends find you on the KanbanFlow.
            <br />
            <br />
            Your profile name and avatar represent you throughout KanbanFlow,
            and must be appropriate for all audiences.
          </span>
        </div>
        <form action="">
          <h1 className="text-4xl text-white py-2 border-gray-350 border-b mb-5 font-light">
            General
          </h1>
          <div className="border-gray-700 bg-gray-800 border w-full rounded-md mb-3">
            <div className="flex flex-col p-5 border-b border-gray-700">
              <span className="text-white text-xl mb-2">Name</span>
              <span className="font-extralight mb-2 text-gray-400">
                Please enter your full name, or a display name you are
                comfortable with.
              </span>
              <input
                type="text"
                className="input w-60 border-gray-500 border "
                value={auth.name}
              />
            </div>
            <div className="px-5 py-3 flex justify-end">
              <button className="bg-white p-1 px-4 text-gray-950 rounded-md">
                Save
              </button>
            </div>
          </div>
          <div className="border-gray-700 bg-gray-800 border w-full rounded-md">
            <div className="flex flex-col p-5 border-b border-gray-700">
              <span className="text-white text-xl mb-2">Email</span>
              <span className="font-extralight mb-2 text-gray-400">
                Please enter your valid email.
              </span>
              <input
                type="text"
                className="input w-60 border-gray-500 border "
                value={auth.email}
              />
            </div>
            <div className="px-5 py-3 flex justify-end">
              <button className="bg-white p-1 px-4 text-gray-950 rounded-md">
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Settings;
