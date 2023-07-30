import { useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import {
  BsFillExclamationTriangleFill,
  BsFillTrash3Fill,
} from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import useStore, { TodoProps } from "../store";
import TextareaAutosize from "react-textarea-autosize";
import DeleteModal from "./Modals/DeleteModal";

const Todo = ({ todos }: { todos: TodoProps[] }) => {
  const { updateTodo, setDraggedTodo } = useStore();
  const [isActiveModal, setActiveModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoProps | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [max, setMax] = useState(false);

  const handleEdit = (todo: TodoProps) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setEditingTodo(todo);
  };

  const handleInputChange = (todo: TodoProps, event) => {
    const text = event.target.value;

    if (text.length <= 255) {
      setEditingTodo({
        ...todo,
        text: event.target.value,
      });
      setMax(false);
    } else {
      setEditingTodo({
        ...todo,
        text: event.target.value.slice(0, 255),
      });
      setMax(true);
    }
  };
  const handleSave = () => {
    if (editingTodo && editingTodo.id !== undefined) {
      updateTodo(editingTodo.id, editingTodo.text);
      setEditingTodo(null);
      setMax(false);
    }
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setActiveModal(false);
    setMax(false);
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
    setMax(false);
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          className="flex flex-col w-full mb-2 bg-white p-1 rounded-md  shadow-md hover:bg-gray-100"
          key={todo.id}
          draggable
          onDragStart={() => setDraggedTodo(todo.id)}
        >
          <div>
            <TextareaAutosize
              ref={inputRef}
              onFocus={() => setMax(false)}
              className={`py-2 px-4 rounded-lg w-full resize-none hover:bg-gray-200  ${
                editingTodo && editingTodo.id === todo.id
                  ? " bg-white border-none"
                  : " "
              } ${
                max
                  ? "border-2 border-red-500 outline-red-600"
                  : "hover:bg-gray-200 "
              }`}
              value={
                editingTodo && editingTodo.id === todo.id
                  ? editingTodo.text
                  : todo.text
              }
              onChange={() => handleInputChange(todo, event)}
              onBlur={handleCancelOutsideTextarea} // Set the onBlur event here
            />
          </div>

          <div className=" text-lg  ">
            {editingTodo && editingTodo.id === todo.id ? (
              <div className="flex justify-between">
                <div>
                  {max ? (
                    <BsFillExclamationTriangleFill className="text-red-500 text-2xl" />
                  ) : null}
                </div>

                <div className="flex">
                  <AiOutlineCheck
                    onMouseDown={handleSave}
                    className="text-green-600 mr-1"
                  />
                  <FcCancel onMouseDown={handleCancel} />
                </div>
              </div>
            ) : (
              <>
                {isActiveModal ? (
                  <DeleteModal
                    todo={todo}
                    id={todo.id}
                    handleCancel={handleCancel}
                  />
                ) : null}
                <div className="flex justify-end">
                  <AiOutlineEdit
                    onClick={() => handleEdit(todo)}
                    className="text-green-600 mr-1 cursor-pointer"
                  />
                  <BsFillTrash3Fill
                    onClick={() => setActiveModal(true)}
                    className="text-red-500 mr-1 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Todo;
