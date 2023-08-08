import { ChangeEvent, useRef, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import useStore from "../../store";
import Buttons from "../Buttons/Buttons";
import { TodoProps } from "../../store";

const Todo = ({ todo }: { todo: TodoProps }) => {
  const { updateTodo, setDraggedTodo, draggedTodo } = useStore();
  const [newText, setNewText] = useState<string>(todo.text || "");
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
      setNewText((prevText) => prevText.slice(0, 255));
      setMax(true);
    }
  };

  const handleDrag = useCallback(() => {
    setDraggedTodo(todo.id);
    console.log(draggedTodo);
  }, [setDraggedTodo, todo.id]);

  return (
    <div
      className={`flex flex-col w-full mb-2 bg-gray-850 p-1 border-2 border-gray-300 rounded-md  shadow-md text-gray-100 hover:border-gray-200 hover:bg-gray-900  `}
      key={todo.id}
      draggable
      onDragStart={handleDrag}
    >
      <div className="title flex items-center justify-between">
        <TextareaAutosize
          name="text"
          ref={inputRef}
          className={` input ${max ? "  outline-red-600" : ""}`}
          value={newText}
          onChange={(e) => handleChange(e)}
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
        />
      </div>

      <Buttons
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
        id={todo.id}
        isEditing={isEditing}
        btnFunction="todo"
      />
    </div>
  );
};

export default Todo;
