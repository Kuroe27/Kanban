import { AiFillExclamationCircle } from "react-icons/ai";
import useStore, { TodoProps } from "../../store";
interface DeleteModalProps {
  todo: TodoProps;
  id: string;
  handleCancel: () => void;
}
const DeleteModal = ({ todo, id, handleCancel }: DeleteModalProps) => {
  const { deleteTodo } = useStore();
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black "
        onClick={handleCancel}
      >
        <div className="bg-white p-10 rounded-lg w-96">
          <h1 className="text-3xl flex items-center mb-5">
            <AiFillExclamationCircle className="text-red-500 mr-2" />
            Delete task "{todo.text}"
          </h1>
          <p className=" text-1xl break-normal mb-3 opacity-70">
            If you proceed, the task will be permanently removed without any way
            to recover it.
          </p>
          <div className="flex justify-end">
            <button
              className="mr-2 p-2 bg-red-500 rounded-md hover:bg-red-600"
              onClick={() => deleteTodo(id)}
            >
              Delete
            </button>
            <button
              className="mr-2 p-2 rounded-md hover:bg-gray-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default DeleteModal;
