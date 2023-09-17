import DeleteModal from "../../components/Modals/DeleteModal";
import ListType from "../../components/Todo/ListType/ListType";
import statusSlice from "../../services/auth/statusSlice";
import taskSlice from "../../services/auth/taskSlice";
import useStore from "../../store";
export interface Status {
  statusName: string;
  _id: string;
}
export interface Task {
  status: string;
}

const List = () => {
  const status = statusSlice.getStatus();
  const task = taskSlice.getTask();
  const { modal } = useStore();
  return (
    <>
      <table className="w-full border-b border-t  border-gray-700 mt-5 overflow-hidden ">
        <tr className=" truncate border-b border-gray-700 ">
          <th className="border-r border-gray-700 text-start  ">Tasks</th>
          <th className="border-r border-gray-700 px-10 ">Date Created</th>
          <th className="border-r border-gray-700 px-10 ">Date Updated</th>
          <th className=" px-10 ">Buttons</th>
        </tr>

        {status.data &&
          status.data.map((statusData: Status) => (
            <ListType
              key={statusData._id}
              status={statusData}
              taskData={task.data}
              taskIsLoading={task.isLoading}
            />
          ))}
      </table>

      {/* <AddColumn /> */}
      {modal.activateModal ? <DeleteModal /> : null}
    </>
  );
};

export default List;
