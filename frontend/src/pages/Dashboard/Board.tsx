import DeleteModal from "../../components/Modals/DeleteModal";
import AddColumn from "../../components/Todo/AddColumn";
import Column from "../../components/Todo/Column";
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
const Board = () => {
  const status = statusSlice.getStatus();
  const task = taskSlice.getTask();
  const { modal } = useStore();
  return (
    <section className="flex h-full">
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
    </section>
  );
};

export default Board;
