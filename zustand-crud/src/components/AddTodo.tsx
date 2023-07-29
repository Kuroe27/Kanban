import { SetStateAction, useState, useRef } from "react";
import useStore from "../store";

const AddTodo = () => {
  const { addTodo } = useStore();
  const [newTodo, setNewTodo] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isActive, setIsActive] = useState(false);
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewTodo(event.target.value);
  };

  const handleCreateTodo = () => {
    if (newTodo.trim() === "") return;
    addTodo(newTodo.trim());
    setNewTodo("");
    setIsActive(false);
  };
  const handleAdd = () => {
    setIsActive(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleCancel = () => {
    setIsActive(false);
    setNewTodo("");
  };
  return (
    <>
      {isActive ? (
        <div className="mb-2 p-2 bg-white flex flex-col items-end rounded-lg shadow-md">
          <textarea
            ref={textareaRef}
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Enter a new todo"
            className="w-full resize-none bg-transparent   hover:bg-gray-200 p-2 rounded-md "
          />
          <div>
            <button
              onClick={handleCreateTodo}
              className="mt-2 mr-2 p-2 rounded-lg hover:bg-gray-200"
            >
              Create
            </button>
            <button
              onClick={handleCancel}
              className="mt-2 mr-2 p-2 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className=" text-center w-full p-2 rounded-md hover:bg-gray-300"
        >
          + Add Task
        </button>
      )}
    </>
  );
};

export default AddTodo;
