import { useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import useStore, { TodoProps } from "../store";
import TextareaAutosize from "react-textarea-autosize";
import DeleteModal from "./Modals/DeleteModal";

const Todo = ({ todos }: { todos: TodoProps[] }) => {
  const { updateTodo, setDraggedTodo } = useStore();
  const [isActiveModal, setActiveModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoProps | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the textarea

  const handleEdit = (todo: TodoProps) => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on the textarea
    }
    setEditingTodo(todo);
  };

  const handleSave = () => {
    if (editingTodo && editingTodo.id !== undefined) {
      updateTodo(editingTodo.id, editingTodo.text);
      setEditingTodo(null);
    }
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setActiveModal(false);
  };

  const handleCancelOutsideTextarea = () => {
    // Check if the textarea is being edited and there's a reference to the textarea
    if (editingTodo && editingTodo.id !== undefined && inputRef.current) {
      // Check if the active element is not the textarea itself
      if (document.activeElement !== inputRef.current) {
        updateTodo(editingTodo.id, editingTodo.text);
        setEditingTodo(null);
      }
    }
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          className="flex flex-col w-full mb-2 bg-white p-1 rounded-md cursor-grab shadow-md hover:bg-gray-100"
          key={todo.id}
          draggable
          onDragStart={() => setDraggedTodo(todo.id)}
        >
          <div>
            <TextareaAutosize
              ref={inputRef}
              className={`py-2 px-4 rounded-lg w-full resize-none hover:bg-gray-200  ${
                editingTodo && editingTodo.id === todo.id
                  ? " bg-white border-none"
                  : " "
              } `}
              value={
                editingTodo && editingTodo.id === todo.id
                  ? editingTodo.text
                  : todo.text
              }
              onChange={(event) =>
                setEditingTodo({
                  ...todo,
                  text: event.target.value,
                })
              }
              onBlur={handleCancelOutsideTextarea} // Set the onBlur event here
            />
          </div>

          <div className="flex justify-end text-lg">
            {editingTodo && editingTodo.id === todo.id ? (
              <>
                <AiOutlineCheck
                  onMouseDown={handleSave} // Use onMouseDown instead of onClick
                  className="text-green-600 mr-1"
                />
                <FcCancel onMouseDown={handleCancel} />
              </>
            ) : (
              <>
                {isActiveModal ? (
                  <DeleteModal
                    todo={todo}
                    id={todo.id}
                    handleCancel={handleCancel}
                  />
                ) : null}
                <AiOutlineEdit
                  onClick={() => handleEdit(todo)}
                  className="text-green-600 mr-1"
                />
                <BsFillTrash3Fill
                  onClick={() => setActiveModal(true)}
                  className="text-red-500 mr-1"
                />
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Todo;
