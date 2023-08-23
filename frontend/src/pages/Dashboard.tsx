import AddColumn from "../components/Todo/AddColumn";
import Column from "../components/Todo/Column";
import DeleteModal from "../components/Modals/DeleteModal";
import useStore from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { status, modal, auth } = useStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <main className="flex max-h-[93vh] min-h-[93vh] mx-auto p-5 bg-gray-800 overflow-x-auto text-white">
      {status.map((status) => (
        <Column key={status.id} status={status} />
      ))}
      <AddColumn />
      {modal.activateModal ? <DeleteModal /> : null}
    </main>
  );
};

export default Dashboard;
