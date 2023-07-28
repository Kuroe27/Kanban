import { SetStateAction, useState, useRef } from "react";
import useStore from "../store";

const AddTodo = () => {
  const { addTodo } = useStore();
  const [newTodo, setNewTodo] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewTodo(event.target.value);
  };

  const handleCreateTodo = () => {
    if (newTodo.trim() === "") return;
    addTodo(newTodo.trim());
    setNewTodo("");
  };

  return (
    <div className="mb-2 p-2 bg-white flex flex-col items-end rounded-lg shadow-md">
      <textarea
        ref={textareaRef}
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
        className="w-full resize-none bg-transparent border-b-2 border-b-slate-400 hover:bg-gray-200 p-2 rounded-md "
      />
      <button
        onClick={handleCreateTodo}
        className="mt-2 mr-2 p-2 rounded-lg hover:bg-gray-200"
      >
        Create
      </button>
    </div>
  );
};

export default AddTodo;
