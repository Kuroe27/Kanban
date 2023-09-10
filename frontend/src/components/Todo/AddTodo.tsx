import { useRef, useState } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import taskSlice from "../../services/auth/taskSlice";
import { TaskProps } from "../../store";
const AddTodo = ({ status }: TaskProps) => {
  const [isActive, setIsActive] = useState(false);
  const [max, setMax] = useState(false);
  const [newTodo, setNewTodo] = useState({
    taskName: "",
    status: status,
  });

  const addTask = taskSlice.createTaskMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const createBtn = useRef<HTMLButtonElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const taskName = event.target.value;

    if (taskName.length <= 255) {
      setNewTodo({
        ...newTodo,
        taskName,
      });
      setMax(false);
    } else {
      setNewTodo({
        ...newTodo,
        taskName: taskName.slice(0, 255),
      });
      setMax(true);
    }
  };

  const handleCancel = () => {
    setIsActive(false);
    setNewTodo({
      ...newTodo,
      taskName: "",
    });
    setMax(false);
  };

  const handleCreateTodo = () => {
    if (newTodo.taskName.trim() === "") return;
    addTask.mutateAsync(newTodo);
    console.log(newTodo);
    setTimeout(() => {
      createBtn.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
    handleCancel();
  };

  const handleAdd = () => {
    setIsActive(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
    setMax(false);
  };

  return (
    <>
      {isActive ? (
        <div className="mb-2 p-2 text-gray-100 flex flex-col rounded-lg shadow-md border-2 border-gray-700">
          <textarea
            ref={textareaRef}
            value={newTodo.taskName}
            onChange={handleInputChange}
            onFocus={() => setMax(false)}
            placeholder="Enter a new task"
            className={`input  ${
              max
                ? "border-2 border-red-500 outline-red-600"
                : "hover:bg-gray-200 hover:text-gray-850"
            }`}
          />

          <div className="flex justify-between items-center text-sm px-2">
            <div>
              {max ? (
                <BsFillExclamationTriangleFill className="text-red-500 text-2xl" />
              ) : null}
            </div>
            <div>
              <button
                onClick={handleCreateTodo}
                className="buttonText bg-gray-100 text-gray-800 hover:bg-gray-50"
              >
                Create
              </button>
              <button
                onClick={handleCancel}
                className="buttonText hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          ref={createBtn}
          onClick={handleAdd}
          id="add"
          className="text-center text-sm  w-full p-2 rounded-md bg-gray-700 text-gray-100 hover:bg-gray-500"
        >
          + Add Task
        </button>
      )}
    </>
  );
};

export default AddTodo;
