import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import taskSlice from "../../../services/auth/taskSlice";
import useStore from "../../../store";
import AddTodoList from "./AddTodoList";
import TodoList from "./TodoList";
interface Status {
  _id: string;
  statusName: string;
}

type TaskProps = {
  _id: string;
  taskName: string;
  status: string;
};

function ListType({
  status,
  taskData,
  taskIsLoading,
}: {
  status: Status;
  taskData: TaskProps[];
  taskIsLoading: boolean;
}) {
  const [isTaskVisible, setIsTaskVisible] = useState(true);
  const updateTodos = taskSlice.updatedTaskStatusMutation();
  const { draggedTodo, setDraggedTodo, setBg, Bg } = useStore();
  const toggleTaskVisibility = () => {
    setIsTaskVisible((prevIsTaskVisible) => !prevIsTaskVisible);
  };

  const { searchQuery } = useStore();

  // Check first the task data if isLoading else filter out the data
  const taskDatas = taskIsLoading
    ? []
    : taskData.filter((task: TaskProps) => task.status === status._id);

  // Filter the task data based on the search query
  const filteredTaskDatas = taskIsLoading
    ? []
    : taskDatas.filter((task: TaskProps) =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return taskIsLoading ? (
    <p>Loading</p>
  ) : (
    <>
      <tr
        className={`w-full border-b border-gray-700 ${
          Bg === true ? "bg-gray-500" : ""
        } hover:bg-gray-500 `}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(_e) => {
          if (draggedTodo !== null) {
          }
          //send request to update the task status
          updateTodos.mutateAsync({ status: status._id });

          const updatedDraggedTodo = {
            ...draggedTodo,
            status: status._id,
          };

          //update the dragged todo
          setDraggedTodo(updatedDraggedTodo);
          setBg(false);
        }}
      >
        <th className="w-full text-start border-r border-gray-700 text-xl font-normal py-3 text-white flex items-center">
          <IoMdArrowDropdown
            // Add click event to toggle task visibility
            onClick={toggleTaskVisibility}
            className={`mr-2 cursor-pointer ${
              isTaskVisible ? "rotate-0" : "rotate-180"
            }`}
          />
          {status.statusName}
        </th>
      </tr>
      {isTaskVisible && (
        <>
          {searchQuery === null
            ? taskDatas.map((task: TaskProps) => (
                <TodoList key={task._id} task={task} />
              ))
            : filteredTaskDatas.map((task: TaskProps) => (
                <TodoList key={task._id} task={task} />
              ))}
          {searchQuery === null && <AddTodoList status={status._id} />}
        </>
      )}
    </>
  );
}

export default ListType;
