import { ChangeEvent, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import useStore, { StatusProps } from "../../store";
import Buttons from "../Buttons/Buttons";
import DeleteBtn from "../Buttons/DeleteBtn";
import Notice from "../Icons/Notice";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

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

  const {
    draggedTodo,
    setDraggedTodo,
    updateStatus,
    updateStatusName,
    setEditStatus,
    status: statuss,
    editStatus,
  } = useStore();

  const handleConfirm = () => {
    if (newStatus.trim() === "") {
      setNewStatus(status.name);
    }
    if (!editStatus.showNotice) {
      updateStatusName(status.id, newStatus);
      setEditStatus({ id: "" });
    } else {
      setEditStatus({ showSpan: true });
      return;
    }
  };

  const handleCancel = () => {
    setNewStatus(status.name);
  };

  const handleBlur = () => {
    if (newStatus.trim() === "" || editStatus.showNotice) {
      setEditStatus({
        id: "",
        showNotice: false,
        showSpan: true,
      });
      setNewStatus(status.name);
    } else {
      updateStatusName(status.id, newStatus);
      setEditStatus({ id: "" });
    }
    setIsEditing(false);
  };

  const handleClick = (id: string) => {
    setEditStatus({ id });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentStatus = statuss.find(
      (currentstatus) =>
        currentstatus.name.toLowerCase() === e.target.value.toLowerCase()
    );
    if (currentStatus && currentStatus.name !== status.name) {
      setEditStatus({ showNotice: true });
    } else {
      setEditStatus({ showNotice: false });
    }
    setNewStatus(e.target.value);

    setEditStatus({
      showNotice: currentStatus && currentStatus.name !== status.name,
    });
    setNewStatus(e.target.value);
  };
  return (
    <section
      className="column"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(_e) => {
        if (draggedTodo !== null) {
          updateStatus(draggedTodo, status.name);
        }
        setDraggedTodo(null);
        console.log(draggedTodo);
      }}
    >
      <div className="title flex items-center justify-between">
        <input
          ref={inputRef}
          className="input truncate"
          value={newStatus}
          onChange={(e) => handleChange(e)}
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
          onClick={() => handleClick(status.id)}
        />

        {editStatus.id === status.id && <Notice />}
        {!isEditing && (
          <DeleteBtn
            id={status.id}
            deleteFunction={"status"}
            activateModal={false}
          />
        )}
      </div>

      <Buttons
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        isEditing={isEditing}
      />

      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      {status.name === "Todo" && <AddTodo />}
    </section>
  );
}

export default Column;
