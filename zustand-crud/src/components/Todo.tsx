import { ChangeEvent, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import useStore from "../store";
import CancelBtn from "./Buttons/CancelBtn";
import Confirm from "./Buttons/Confirm";
import DeleteBtn from "./Buttons/DeleteBtn";
import EditBtn from "./Buttons/EditBtn";

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

  const handleConfirm = () => {
    updateTodo(todo.id, newText);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateTodo(todo.id, newText);
  };

  const handleCancel = () => {
    setNewText(todo.text);
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
          className={` text-xl py-2 px-4 rounded-lg w-full resize-none bg-transparent mb-2  hover:bg-gray-300 ${
            max ? "  outline-red-600" : ""
          }`}
          value={newText}
          onChange={(e) => handleChange(e)}
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
        />
      </div>
      {isEditing ? (
        <div className="flex justify-end text-4xl text-gray-200 mb-2 ">
          <Confirm handleConfirm={handleConfirm} />
          <CancelBtn handleCancel={handleCancel} />
        </div>
      ) : (
        <>
          <div className="flex justify-end text-xl">
            <EditBtn handleEdit={handleEdit} />
            <DeleteBtn id={todo.id} deleteFunction="todo" />
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
