import { AiFillExclamationCircle } from "react-icons/ai";
import useStore from "../../store";

const DeleteModal = () => {
  const {
    deleteTodo,
    closeModal,
    deleteStatus,
    todoId,
    todos,
    deleteFunction,
    status,
  } = useStore();

  const findTodo = () => {
    const todo = todos.find((todo) => todo.id === todoId);
    return todo ? todo.text : null;
  };

  const todoText = findTodo();

  const findStatus = () => {
    const statuss = status.find((s) => s.id === todoId);
    return statuss ? statuss.name : null;
  };

  const statusText = findStatus();

  const handleDelete = () => {
    if (deleteFunction === "todo") {
      deleteTodo(todoId);
    } else {
      deleteStatus(todoId);
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black text-white">
        <div className="bg-gray-600 p-10 rounded-lg w-4/12">
          <h1 className="text-3xl flex items-center mb-5">
            <AiFillExclamationCircle className="text-red-500 mr-2" />
            {deleteFunction === "todo"
              ? `Delete task "${todoText}"`
              : `Delete status "${statusText}"`}
          </h1>
          <p className="text-1xl break-normal mb-3 opacity-70">
            If you proceed, the task will be permanently removed without any way
            to recover it.
          </p>
          <div className="flex justify-end">
            <button
              className="mr-2 p-2 bg-red-500 rounded-md hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button onClick={() => closeModal(true)}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
