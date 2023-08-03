import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { shallow } from "zustand/shallow";
import useStore from "../store";
import AddTodo from "./AddTodo";
import Buttons from "./Buttons/Buttons";
import DeleteBtn from "./Buttons/DeleteBtn";
import Todo from "./Todo";

interface ColumnProps {
  status: string;
  id: string;
}

function Column({ status, id }: ColumnProps) {
  const [newStatus, setNewStatus] = useState(status);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = useStore(
    (state) => state.todos.filter((todo) => todo.status === status),
    shallow
  );
  const { draggedTodo, setDraggedTodo, updateStatus, updateStatusName } =
    useStore();
  const handleConfirm = () => {
    updateStatusName(id, newStatus);
  };

  const handleCancel = () => {
    setNewStatus(status);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateStatusName(id, newStatus);
  };

  return (
    <div
      className="Column min-w-[25rem] max-w-[25rem] rounded-lg mr-2 p-2 bg-gradient-to-t 
      from-gray-800 from-5% via-gray-950 via-45% to-gray-700 to-90%  overflow-y-auto"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(_e) => {
        if (draggedTodo !== null) {
          updateStatus(draggedTodo, status);
          setDraggedTodo(null);
        }
      }}
    >
      <div className="title flex items-center justify-between">
        <input
          ref={inputRef}
          className="mb-2 p-2 text-gray-100 bg-transparent text-2xl w-full outline-gray-200"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
        />
        {!isEditing ? <DeleteBtn id={id} deleteFunction={"status"} /> : null}

        {status === "Todo" ? (
          <AiOutlinePlus className=" text-gray-100 text-5xl p-2 hover:bg-gray-200 hover:text-gray-700" />
        ) : null}
      </div>

      <Buttons
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        isEditing={isEditing}
        btnFuntion={""}
      />

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      {status === "Todo" ? <AddTodo /> : null}
    </div>
  );
}

export default Column;
