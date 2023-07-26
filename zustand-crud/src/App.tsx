import { useState } from "react";
import "./App.css";
import useStore from "./store";

function App() {
  const { todos, addTodo, deleteTodo, updateTodo, id } = useStore();

  const [newTodo, setNewTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [todoIndex, setTodoIndex] = useState(null);
  const [newText, setNewText] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleCreateTodo = () => {
    if (newTodo.trim() === "") return;
    addTodo(newTodo.trim());
    setNewTodo("");
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setTodoIndex(index);
    setNewText(todos[index].text);
  };
  const handleSave = (index) => {
    updateTodo(index, newText);
    setIsEditing(false);
    setTodoIndex(null);
    setNewText("");
  };
  const handleCancel = () => {
    setIsEditing(false);
    setTodoIndex(null);
    setNewText("");
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button onClick={handleCreateTodo}>Create</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {isEditing && todoIndex === index ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={(event) => setNewText(event.target.value)}
                />
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
