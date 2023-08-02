import AddColumn from "../components/AddColumn";
import Column from "../components/Column";
import DeleteModal from "../components/Modals/DeleteModal";
import useStore from "../store";

const Dashboard = () => {
  const { status, activateModal } = useStore();

  return (
    <main className="flex max-h-[93vh] min-h-[93vh] mx-auto overflow-auto p-5 bg-gray-800">
      {status.map((status) => (
        <Column key={status.id} id={status.id} status={status.name} />
      ))}
      <AddColumn />
      {activateModal ? <DeleteModal /> : null}
    </main>
  );
};

export default Dashboard;
