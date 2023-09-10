import { ChangeEvent, useRef, useState, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import useStore from "../../store";
import Buttons from "../Buttons/Buttons";
import { TaskProps } from "../../store";

const Todo = ({ task }: { task: TaskProps }) => {
  const { updateTodo, setDraggedTodo, draggedTodo } = useStore();
  const [newText, setNewText] = useState<string>(task.taskName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [max, setMax] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleConfirm = () => {
    updateTodo(task._id, newText);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateTodo(task._id, newText);
  };

  const handleCancel = () => {
    setNewText(task.taskName);
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
    setDraggedTodo(task._id);
    console.log(draggedTodo);
  }, [setDraggedTodo, task._id]);

  return (
    <div
      className={`flex flex-col w-full mb-2 bg-gray-850 p-1 border-2 border-gray-700 rounded-md  shadow-md text-gray-100 hover:border-gray-400 hover:bg-gray-450 overflow-hidden  `}
      key={task._id}
      draggable
      onDragStart={handleDrag}
    >
      <div className="title flex items-center justify-between">
        <TextareaAutosize
          name="taskName"
          ref={inputRef}
          className={` input ${max ? "  outline-red-600" : ""} overflow-hidden`}
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
        _id={task._id}
        isEditing={isEditing}
        btnFunction="task"
      />
    </div>
  );
};

export default Todo;
