import { useState } from "react";
import Column from "../components/Column";
import useStore from "../store";

const Dashboard = () => {
  const [statusName, setStatusName] = useState("");
  const { status, createStatus } = useStore();

  const handleCreateStatus = () => {
    createStatus(statusName);
    setStatusName("");
  };
  return (
    <main className="flex max-h-[93vh] min-h-[93vh] mx-auto overflow-auto p-5 bg-gray-800">
      {status.map((status) => (
        <Column key={status.id} id={status.id} status={status.name} />
      ))}
      <div
        className="Column min-w-[25rem] max-w-[25rem] rounded-lg mr-2 p-2 bg-gradient-to-t 
      from-gray-800 from-5% via-gray-950 via-45% to-gray-700 to-90%  overflow-auto"
      >
        <textarea
          onChange={(e) => setStatusName(e.target.value)}
          value={statusName}
          placeholder="Enter a new todo"
          className={`w-full resize-none bg-transparent p-2 rounded-md text-gray-100 placeholder:text-gray-200 outline-gray-200  `}
        />
        <button
          className="text-center text-xl w-full p-2 rounded-md text-gray-200 hover:bg-gray-300"
          onClick={handleCreateStatus}
        >
          + Add Task
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
