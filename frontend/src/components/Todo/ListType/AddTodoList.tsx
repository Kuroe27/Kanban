import { useRef, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import taskSlice from "../../../services/auth/taskSlice";
import { TaskProps } from "../../../store";
const AddTodoList = ({ status }: TaskProps) => {
  const [isActive, setIsActive] = useState(false);
  const [max, setMax] = useState(false);
  const [newTodo, setNewTodo] = useState({
    taskName: "",
    status: status,
  });

  const addTask = taskSlice.createTaskMutation();
  const textareaRef = useRef<HTMLInputElement>(null);
  const createBtn = useRef<HTMLButtonElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <tr className=" text-gray-10 border-t border-gray-700  ">
          <td className="border-r border-gray-700 w-full">
            <input
              ref={textareaRef}
              value={newTodo.taskName}
              onChange={handleInputChange}
              onFocus={() => setMax(false)}
              placeholder="Enter a new task"
              className={`bg-transparent resize-none w-full outline-none pl-5 ${
                max
                  ? "border-2 border-red-500 outline-red-600"
                  : "hover:bg-gray-200 hover:text-gray-850"
              }`}
            />
          </td>
          <td className="border-r border-gray-700 w-full"></td>
          <td className="border-r border-gray-700 w-full"></td>
          <td className="w-full flex justify-center">
            <AiOutlineCheck
              onClick={handleCreateTodo}
              className="text-lg mr-2 cursor-pointer"
            />
            <RxCross2
              onClick={handleCancel}
              className="text-lg cursor-pointer "
            />
          </td>
        </tr>
      ) : (
        <tr className=" text-gray-10 border-t border-gray-700  ">
          <td className=" text-gray-10 border-r border-gray-700  ">
            <button
              ref={createBtn}
              onClick={handleAdd}
              id="add"
              className="pl-5 text-start text-sm  w-full  text-gray-100 hover:bg-gray-500"
            >
              + Add Task
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default AddTodoList;
