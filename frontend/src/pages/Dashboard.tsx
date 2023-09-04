import DeleteModal from "../components/Modals/DeleteModal";
import AddColumn from "../components/Todo/AddColumn";
import Column from "../components/Todo/Column";
import statusSlice from "../services/auth/statusSlice";
import useStore from "../store";
export interface Status {
  statusName: string;
  _id: string;
}
const Dashboard = () => {
  const { modal } = useStore();
  const status = statusSlice.getStatus();

  return (
    <>
      <main className="flex h-[calc(100vh-4rem)] mx-auto p-5 bg-gray-900 overflow-x-auto text-white">
        {status.isLoading ? (
          <>
            <p>loading</p>
          </>
        ) : (
          <>
            {status.data &&
              status.data.map((statusData: Status) => (
                <Column key={statusData._id} status={statusData} />
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
