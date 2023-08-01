import { ChangeEvent, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import TextareaAutosize from "react-textarea-autosize";
import useStore, { TodoProps } from "../store";
import DeleteBtn from "./Buttons/DeleteBtn";

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

  const handleInputChange = (
    todo: TodoProps,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
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
      if (editingTodo.text.trim() !== "") {
        // Check if the trimmed text is not empty
        updateTodo(editingTodo.id, editingTodo.text);
      }
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
      if (editingTodo.text.trim() !== "") {
        if (document.activeElement !== inputRef.current) {
          updateTodo(editingTodo.id, editingTodo.text);
        }
      }
    }
    setEditingTodo(null);

    setMax(false);
  };

  return (
    <>
      {todos.map((todo) => (
        <div
          className="flex flex-col w-full mb-2 bg-gray-850 p-1 border-2 border-gray-300 rounded-md  shadow-md text-gray-100 hover:bg-gray-900 hover:border-gray-200 "
          key={todo.id}
          draggable
          onDragStart={() => setDraggedTodo(todo.id)}
        >
          <div>
            <TextareaAutosize
              ref={inputRef}
              onFocus={() => setMax(false)}
              className={` text-xl py-2 px-4 rounded-lg w-full resize-none bg-transparent  hover:bg-gray-300 ${
                max && editingTodo && editingTodo.id === todo.id
                  ? "border-2 border-red-500 outline-red-600"
                  : "outline-gray-200  hover:bg-gray-200 "
              }`}
              value={
                editingTodo && editingTodo.id === todo.id
                  ? editingTodo.text
                  : todo.text
              }
              onChange={(event) => handleInputChange(todo, event)}
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
                  <div className=" relative  group ">
                    <AiOutlineCheck
                      onMouseDown={handleSave}
                      className="text-green-600 mr-1"
                    />

                    <span className="tooltip group-hover:scale-100">Save</span>
                  </div>
                  <div className=" relative  group ">
                    <FcCancel onMouseDown={handleCancel} />

                    <span className="tooltip group-hover:scale-100">
                      Cancel
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-end text-xl">
                  <div className=" relative  group ">
                    <AiOutlineEdit
                      onClick={() => handleEdit(todo)}
                      className="text-gray-200 mr-2 cursor-pointer"
                    />
                    <span className="tooltip group-hover:scale-100">Edit</span>
                  </div>
                  <div className=" relative  group ">
                    <DeleteBtn id={todo.id} />
                    <span className="tooltip group-hover:scale-100">
                      Delete
                    </span>
                  </div>
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
