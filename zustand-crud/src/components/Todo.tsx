import { useState } from "react";
import useStore from "../store";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import TextareaAutosize from "react-textarea-autosize";
const Todo = ({ todos }) => {
  const { deleteTodo, updateTodo, updateStatus, setDraggedTodo } = useStore();
  const [editingTodo, setEditingTodo] = useState({});

  const handleEdit = (todo) => {
    setEditingTodo({ id: todo.id, text: todo.text });
  };

  const handleSave = () => {
    updateTodo(editingTodo.id, editingTodo.text);
    setEditingTodo({});
  };

  const handleCancel = () => {
    setEditingTodo({});
  };

  const handleDragStart = (event, todo) => {
    event.dataTransfer.setData("text/plain", todo.id);
    setDraggedTodo(todo.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetTodo) => {
    const draggedTodoId = event.dataTransfer.getData("text");
    if (draggedTodoId !== targetTodo.id) {
      updateStatus(draggedTodoId, targetTodo.id);
    }
    setDraggedTodo(null);
  };

  return (
    <div className="cursor-pointer">
      <div className="">
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              draggable
              onDragStart={(event) => handleDragStart(event, todo)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, todo)}
            >
              <div className="flex flex-col w-full mb-2 bg-white p-1 rounded-md">
                <div>
                  <TextareaAutosize
                    className={`py-2 px-4 rounded-lg w-full resize-none   hover:bg-gray-200  ${
                      editingTodo ? " bg-white border-none" : " bg-gray-100"
                    } `}
                    type="text"
                    value={
                      editingTodo.id === todo.id ? editingTodo.text : todo.text
                    }
                    onChange={(event) =>
                      setEditingTodo({
                        ...editingTodo,
                        text: event.target.value,
                      })
                    }
                    onClick={() => handleEdit(todo)}
                  />
                </div>

                <div className="flex justify-end text-lg">
                  {editingTodo && editingTodo.id === todo.id ? (
                    <>
                      <AiOutlineCheck
                        onClick={handleSave}
                        className="text-green-600 mr-1"
                      />
                      <FcCancel onClick={handleCancel} />
                    </>
                  ) : (
                    <>
                      <AiOutlineEdit
                        onClick={() => handleEdit(todo)}
                        className="text-green-600 mr-1"
                      />
                      <BsFillTrash3Fill
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 mr-1 "
                      />
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
