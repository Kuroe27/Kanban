import { ChangeEvent, useCallback, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import taskSlice from "../../../services/auth/taskSlice";
import useStore, { TaskProps } from "../../../store";
import Buttons from "../../Buttons/Buttons";
import { GoGrabber } from "react-icons/go";

const TodoList = ({ task }: { task: TaskProps }) => {
  const { setDraggedTodo, draggedTodo } = useStore();
  const { setBg } = useStore();
  const updateTodos = taskSlice.updatedTaskMutation();
  const [newText, setNewText] = useState<string | undefined>(task.taskName);
  const [isEditing, setIsEditing] = useState(false);
  const [max, setMax] = useState(false);
  const [showGrabber, setShowGrabber] = useState(false);

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
    setBg(true);
  }, [setDraggedTodo, task._id]);

  return (
    <tr
      className={`w-full border-t border-gray-700 ${
        showGrabber ? "hover:bg-gray-20" : ""
      }`}
      key={task._id}
      draggable
      onDragStart={handleDrag}
      onMouseEnter={() => setShowGrabber(true)}
      onMouseLeave={() => setShowGrabber(false)}
    >
      <td className="w-full font-extralight text-gray-300 border-r border-gray-700">
        <div className="flex items-center">
          {showGrabber ? (
            <GoGrabber className="cursor-grab text-white  mr-2" />
          ) : (
            <div className="w-4 mr-2"></div>
          )}
          <TextareaAutosize
            name="taskName"
            ref={inputRef}
            className={`bg-transparent resize-none w-full outline-none ${
              max ? "outline-red-600" : ""
            } overflow-hidden`}
            value={newText}
            onChange={(e) => handleChange(e)}
            onKeyDown={() => setIsEditing(true)}
            onBlur={handleBlur}
          />
        </div>
      </td>
      <td className="w-full font-extralight text-gray-300 px-10 border-r border-gray-700">
        {task.createdAt && task.createdAt.slice(0, 10)}
      </td>
      <td className="w-full font-extralight text-gray-300 px-10 border-r border-gray-700">
        {task.updatedAt && task.updatedAt.slice(0, 10)}
      </td>
      <td className="flex justify-center">
        <Buttons
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          handleEdit={handleEdit}
          _id={task._id}
          isEditing={isEditing}
          btnFunction="task"
        />
      </td>
    </tr>
  );
};

export default TodoList;
