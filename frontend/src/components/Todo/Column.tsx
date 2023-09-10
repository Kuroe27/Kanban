import { useState } from "react";
import useStore from "../../store";
import Buttons from "../Buttons/Buttons";
import DeleteBtn from "../Buttons/DeleteBtn";
import Notice from "../Icons/Notice";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import statusSlice from "../../services/auth/statusSlice";

interface Status {
  _id: string;
  statusName: string;
}

type TaskProps = {
  _id: string;
  taskName: string;
  status: string;
};

function Column({
  status,
  taskData,
  taskIsLoading,
}: {
  status: Status;
  taskData: TaskProps[];
  taskIsLoading: boolean;
}) {
  const [newStatus, setNewStatus] = useState(status.statusName);
  const [isEditing, setIsEditing] = useState(false);

  const taskDatas = taskIsLoading
    ? []
    : taskData.filter((task: TaskProps) => task.status === status._id);
  // store
  const { draggedTodo, setDraggedTodo, setEditStatus, editStatus } = useStore();

  const updateStatuss = statusSlice.updatedStatusMutation();
  // update statusname confirmation
  const handleConfirm = () => {
    if (newStatus.trim() === "") {
      setNewStatus(status.statusName);
    }
    if (!editStatus.showNotice) {
      updateStatuss.mutateAsync({ statusName: newStatus });
    } else {
      setEditStatus({ showSpan: true });
      return;
    }
  };

  // cancel edit/update
  const handleCancel = () => {
    setNewStatus(status.statusName);
  };

  // cancel edit when not focus
  const handleBlur = () => {
    if (newStatus.trim() === "" || editStatus.showNotice) {
      setEditStatus({
        id: "",
        showNotice: false,
        showSpan: true,
      });
      setNewStatus(status.statusName);
    } else {
      updateStatuss.mutateAsync({ statusName: newStatus });
    }
    setIsEditing(false);
  };

  // setEdit id to the store
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
        }
        setDraggedTodo(null);
        console.log(draggedTodo);
      }}
    >
      <div className="title flex items-center justify-between">
        <input
          className="input truncate"
          value={newStatus}
          onKeyDown={() => setIsEditing(true)}
          onBlur={handleBlur}
          onClick={() => handleClick(status._id)}
          onChange={(e) => setNewStatus(e.target.value)}
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

      {taskIsLoading ? (
        <p>Loading</p>
      ) : (
        taskDatas.map((task: TaskProps) => <Todo key={task._id} task={task} />)
      )}
      <AddTodo status={status._id} _id={""} taskName={""} />
    </section>
  );
}

export default Column;
