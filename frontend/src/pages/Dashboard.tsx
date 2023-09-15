import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/Modals/DeleteModal";
import AddColumn from "../components/Todo/AddColumn";
import Column from "../components/Todo/Column";
import statusSlice from "../services/auth/statusSlice";
import taskSlice from "../services/auth/taskSlice";
import useStore from "../store";
export interface Status {
  statusName: string;
  _id: string;
}
export interface Task {
  status: string;
}

const SkeletonTodo = () => {
  return (
    <div className="border border-gray-700 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-2">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-2 bg-gray-700 rounded col-span-2"></div>
              <div className="h-2 bg-gray-700 rounded col-span-"></div>
            </div>
            <div className="h-2 bg-gray-700 rounded"></div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-2 bg-gray-700 rounded col-span-2"></div>
              <div className="h-2 bg-gray-700 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SkeletonStatus = () => {
  return (
    <>
      <div className="column">
        <SkeletonTodo />
        <SkeletonTodo />
        <div className="border border-gray-700 shadow rounded-md w-full  mt-2">
          <div className="animate-pulse  ">
            <div className="h-2 bg-gray-700 rounded p-4 "></div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ NavName, to }: any) => {
  const navigate = useNavigate();
  const isActive = location.pathname === to;
  return (
    <a
      className={`h-full  flex items-center justify-centerborder-gray-350 cursor-pointer mr-2 hover:text-white hover:border-white p-2 ${
        isActive
          ? "text-white border-white  border-b-2 "
          : "text-gray-350 hover:border-white hover:border-b-2 hover:text-white"
      }`}
      onClick={() => navigate(to)}
    >
      {NavName}
    </a>
  );
};

const Dashboard = () => {
  const { modal } = useStore();
  const status = statusSlice.getStatus();
  const task = taskSlice.getTask();

  return (
    <>
      <div className="text-gray-50 w-full px-5 h-14 flex items-center text-center border-b border-gray-600 sticky top-16">
        <NavItem NavName="Board" to="/" />
        <NavItem NavName="List" to="/list" />
        <NavItem NavName="Dashboard" to="/dashboard" />
      </div>
      <div className="px-5 mt-5">
        <input
          type="text"
          className="input border border-[#70707060] m-0 px-5"
          placeholder="Search..."
        />
      </div>
      <main className="flex h-[calc(100vh-12rem)] mx-auto p-5 bg-gray-850 overflow-x-auto text-white">
        {status.isLoading && task.isLoading ? (
          <>
            <SkeletonStatus />
            <SkeletonStatus />
            <SkeletonStatus />
            <SkeletonStatus />
          </>
        ) : (
          <>
            {status.data &&
              status.data.map((statusData: Status) => (
                <Column
                  key={statusData._id}
                  status={statusData}
                  taskData={task.data}
                  taskIsLoading={task.isLoading}
                />
              ))}
            <AddColumn />
            {modal.activateModal ? <DeleteModal /> : null}
          </>
        )}
      </main>
    </>
  );
};

export default Dashboard;
