import { useState } from "react";
import useStore from "../store";

const AddTodo = () => {
  const { addTodo } = useStore();
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleCreateTodo = () => {
    if (newTodo.trim() === "") return;
    addTodo(newTodo.trim());
    setNewTodo("");
  };
  return (
    <div className="mb-2">
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      <button onClick={handleCreateTodo}>Create</button>
    </div>
  );
};

export default AddTodo;
