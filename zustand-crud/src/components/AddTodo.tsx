import { useRef, useState } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import useStore from "../store";

const AddTodo = () => {
  const { addTodo } = useStore();
  const [newTodo, setNewTodo] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [max, setMax] = useState(false);

  const handleInputChange = (event: { target: { value: string } }) => {
    const text = event.target.value;

    if (text.length <= 255) {
      setNewTodo(text);
      setMax(false);
    } else {
      setNewTodo(text.slice(0, 255));
      setMax(true);
    }
  };

  const handleCreateTodo = () => {
    if (newTodo.trim() === "") return;
    addTodo(newTodo.trim());
    setNewTodo("");
    setIsActive(false);
    setMax(false);
  };

  const handleAdd = () => {
    setIsActive(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
    setMax(false);
  };

  const handleCancel = () => {
    setIsActive(false);
    setNewTodo("");
    setMax(false);
  };
  return (
    <>
      {isActive ? (
        <div className="mb-2 p-2 bg-gray-950 text-gray-100 flex flex-col rounded-lg shadow-md border-2 border-gray-300">
          <textarea
            ref={textareaRef}
            value={newTodo}
            onChange={handleInputChange}
            onFocus={() => setMax(false)}
            placeholder="Enter a new todo"
            className={`w-full resize-none bg-transparent p-2 rounded-md text-gray-100  ${
              max
                ? "border-2 border-red-500 outline-red-600"
                : "hover:bg-gray-200 "
            }`}
          />

          <div className="flex justify-between items-center px-2">
            <div>
              {max ? (
                <BsFillExclamationTriangleFill className="text-red-500 text-2xl" />
              ) : null}
            </div>
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
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className="text-center w-full p-2 rounded-md text-gray-200 hover:bg-gray-300"
        >
          + Add Task
        </button>
      )}
    </>
  );
};

export default AddTodo;
