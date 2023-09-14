import { ChangeEvent, useCallback, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import taskSlice from "../../services/auth/taskSlice";
import useStore, { TaskProps } from "../../store";
import Buttons from "../Buttons/Buttons";

const Todo = ({ task }: { task: TaskProps }) => {
  const { setDraggedTodo, draggedTodo } = useStore();
  const updateTodos = taskSlice.updatedTaskMutation();

  const [newText, setNewText] = useState<string | undefined>(task.taskName);
  const [isEditing, setIsEditing] = useState(false);
  const [max, setMax] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  //update the dragged todo taskname
  const updatedDraggedTodo = {
    ...draggedTodo,
    _id: task._id,
    taskName: newText,
  };

  const handleEdit = () => {
    //handle edit icon click, if clicked focus to the textbox
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleConfirm = () => {
    //handle edit icon click, if clicked send request to update the task
    setDraggedTodo(updatedDraggedTodo);
    updateTodos.mutateAsync(updatedDraggedTodo);
  };

  const handleBlur = () => {
    //handle blur, if textbox is not onfoucst send request to update the task
    setIsEditing(false);
    setDraggedTodo(updatedDraggedTodo);
    updateTodos.mutateAsync(updatedDraggedTodo);
  };

  const handleCancel = () => {
    //set the previous task name to the textbox
    setNewText(task.taskName);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //if the text length is greater or equal to 255 the set the max on and display red border
    if (e.target.value.length <= 255) {
      setNewText(e.target.value);
      setMax(false);
    } else {
      setNewText((prevText) => prevText?.slice(0, 255));
      setMax(true);
    }
  };

  const handleDrag = useCallback(() => {
    setDraggedTodo(task);
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
