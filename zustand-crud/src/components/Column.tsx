import { ChangeEvent, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { shallow } from "zustand/shallow";
import useStore from "../store";
import AddTodo from "./AddTodo";
import Buttons from "./Buttons/Buttons";
import DeleteBtn from "./Buttons/DeleteBtn";
import Notice from "./Icons/Notice";
import Todo from "./Todo";
import { StatusProps } from "../store";

interface ColumnProps {
  status: StatusProps;
}
function Column({ status }: ColumnProps) {
  const [newStatus, setNewStatus] = useState(status.name);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = useStore(
    (state) => state.todos.filter((todo) => todo.status === status.name),
    shallow
  );

  const { setEditStatus, status: statuss, editStatus } = useStore();

  const { draggedTodo, setDraggedTodo, updateStatus, updateStatusName } =
    useStore();

  const handleConfirm = () => {
    if (newStatus.trim() === "") {
      setNewStatus(status.name);
    }
    if (!editStatus.showNotice) {
      updateStatusName(status.id, newStatus);
      setEditStatus({
        id: "",
      });
    } else {
      setEditStatus({
        showSpan: true,
      });
      return;
    }
  };

  const handleCancel = () => {
    setNewStatus(status.name);
  };

  const handleBlur = () => {
    if (newStatus.trim() === "" || editStatus.showNotice) {
      setEditStatus({
        showNotice: false,
        showSpan: true,
      });
      setNewStatus(status.name);
    } else {
      updateStatusName(status.id, newStatus);
      setEditStatus({
        id: "",
      });
    }
    setIsEditing(false);
  };

  const handleClick = (id: string) => {
    setEditStatus({ id: id });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentStatus = statuss.find(
      (currentstatus) =>
        currentstatus.name.toLowerCase() === e.target.value.toLowerCase()
    );
    if (currentStatus && currentStatus.name !== status.name) {
      setEditStatus({
        showNotice: true,
      });
    } else {
      setEditStatus({
        showNotice: false,
      });
    }
    setNewStatus(e.target.value);
  };
  return (
    <section
      className="Column min-w-[17rem] max-w-[17rem] rounded-lg mr-2 p-2 bg-gradient-to-t 
    from-gray-800 from-5% via-gray-950 via-45% to-gray-700 to-90%  overflow-y-auto overflow-x-hidden"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(_e) => {
        if (draggedTodo !== null) {
          updateStatus(draggedTodo, status.name);
          setDraggedTodo(null);
        }
      }}
    >
      <div className="title flex items-center justify-between">
        <input
          ref={inputRef}
          className="mb-2 p-2 text-gray-100 bg-transparent text-lg w-full outline-gray-200"
          value={newStatus}
          onChange={(e) => handleChange(e)}
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
          onClick={() => handleClick(status.id)}
        />
        {editStatus.id === status.id ? <Notice /> : null}
        {!isEditing ? (
          <DeleteBtn
            id={status.id}
            deleteFunction={"status"}
            activateModal={false}
          />
        ) : null}

        {status.name === "Todo" ? (
          <AiOutlinePlus className=" text-gray-100 text-5xl p-2 hover:bg-gray-200 hover:text-gray-700" />
        ) : null}
      </div>

      <Buttons
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        isEditing={isEditing}
      />

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      {status.name === "Todo" ? <AddTodo /> : null}
    </section>
  );
}

export default Column;
