import { ChangeEvent, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import TextareaAutosize from "react-textarea-autosize";
import useStore from "../store";
import DeleteBtn from "./Buttons/DeleteBtn";

interface Todo {
  id: string;
  text: string;
}

const Todo = ({ todo }: { todo: Todo }) => {
  const { updateTodo, setDraggedTodo } = useStore();
  const [newText, setNewText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const [max, setMax] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateTodo(todo.id, newText);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 255) {
      setNewText(e.target.value);
      setMax(false);
    } else {
      e.target.value.slice(0, 255);
      setMax(true);
    }
  };

  return (
    <div
      className="flex flex-col w-full mb-2 bg-gray-850 p-1 border-2 border-gray-300 rounded-md  shadow-md text-gray-100 hover:bg-gray-900 hover:border-gray-200 "
      key={todo.id}
      draggable
      onDragStart={() => setDraggedTodo(todo.id)}
    >
      <div className="title flex items-center justify-between">
        <TextareaAutosize
          name="text"
          ref={inputRef}
          className={` text-xl py-2 px-4 rounded-lg w-full resize-none bg-transparent  hover:bg-gray-300 ${
            max
              ? "border-2   outline-red-600"
              : "outline-gray-200  hover:bg-gray-200 "
          }`}
          value={newText}
          onChange={(e) => handleChange(e)}
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
        />
      </div>
      {isEditing ? (
        <div className="flex justify-end text-4xl text-gray-200 mb-2 ">
          <AiOutlineCheck
            onMouseDown={() => updateTodo(todo.id, newText)}
            className="bg-gray-300 p-1 mr-2 hover:bg-gray-600"
          />
          <RxCross2
            onMouseDown={() => setNewText(todo.text)}
            className="bg-gray-300 p-1 hover:bg-gray-600 "
          />
        </div>
      ) : (
        <>
          <div className="flex justify-end text-xl">
            <div className=" relative  group ">
              <AiOutlineEdit
                onClick={handleEdit}
                className="text-gray-200 mr-2 cursor-pointer"
              />
              <span className="tooltip group-hover:scale-100">Edit</span>
            </div>
            <DeleteBtn id={todo.id} deleteFunction="todo" />
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
