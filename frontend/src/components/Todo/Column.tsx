import { useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import statusSlice from "../../services/auth/statusSlice";
import useStore from "../../store";
import Buttons from "../Buttons/Buttons";
import DeleteBtn from "../Buttons/DeleteBtn";
import Notice from "../Icons/Notice";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

interface Status {
  status: {
    _id: string;
    statusName: string;
  };
}

function Column({ status }: Status) {
  const deleteStatus = statusSlice.deleteStatusMutation();

  const [newStatus, setNewStatus] = useState(status.statusName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const todos = useStore(
    (state) => state.todos.filter((todo) => todo.status === status.statusName),
    shallow
  );

  const {
    draggedTodo,
    setDraggedTodo,
    updateStatus,
    updateStatusName,
    setEditStatus,
    editStatus,
  } = useStore();

  const handleConfirm = () => {
    if (newStatus.trim() === "") {
      setNewStatus(status.statusName);
    }
    if (!editStatus.showNotice) {
      // Assuming you have a function named updateStatusName that takes id and newStatus as arguments
      updateStatusName(status._id, newStatus);
      setEditStatus({ id: "" });
    } else {
      setEditStatus({ showSpan: true });
      return;
    }
  };

  const handleCancel = () => {
    setNewStatus(status.statusName);
  };

  const handleBlur = () => {
    if (newStatus.trim() === "" || editStatus.showNotice) {
      setEditStatus({
        id: "",
        showNotice: false,
        showSpan: true,
      });
      setNewStatus(status.statusName);
    } else {
      // Assuming you have a function named updateStatusName that takes id and newStatus as arguments
      updateStatusName(status._id, newStatus);
      setEditStatus({ id: "" });
    }
    setIsEditing(false);
  };

  const handleClick = (id: string) => {
    setEditStatus({ id });
  };

  return (
    <section
      className="column"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(_e) => {
        if (draggedTodo !== null) {
          updateStatus(draggedTodo, status.statusName);
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
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
          onClick={() => handleClick(status._id)}
        />

        {editStatus.id === status._id && <Notice />}
        {!isEditing && (
          <DeleteBtn
            id={status._id}
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

      <button
        onClick={() => {
          deleteStatus.mutateAsync(status._id);
        }}
      >
        del
      </button>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <AddTodo />
    </section>
  );
}

export default Column;
