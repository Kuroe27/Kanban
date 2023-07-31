// Column.tsx
import { shallow } from "zustand/shallow";
import useStore from "../store";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
interface ColumnProps {
  status: string;
  id: string;
}

function Column({ status, id }: ColumnProps) {
  const todos = useStore(
    (state) => state.todos.filter((todo) => todo.status === status),
    shallow
  );
  const {
    draggedTodo,
    setDraggedTodo,
    updateStatus,
    deleteStatus,
    updateStatusName,
  } = useStore();

  const [newStatus, setNewStatus] = useState(status);

  return (
    <div
      className="Column min-w-[20rem] max-w-[20rem] rounded-lg mr-2 p-2 bg-gradient-to-t 
      from-gray-800 from-5% via-gray-950 via-45% to-gray-700 to-90%  overflow-auto"
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
          className="mb-2 p-2 text-gray-100 bg-transparent text-2xl"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
        {status === "Todo" ? (
          <AiOutlinePlus className="mb-2  text-gray-100 text-5xl p-2 hover:bg-gray-200 hover:text-gray-700" />
        ) : null}
      </div>
      <button onClick={() => updateStatusName(id, newStatus)}>update</button>
      <button onClick={() => deleteStatus(id)}>delete</button>
      <button onClick={() => setNewStatus(status)}>Cancel</button>
      <Todo todos={todos} />
      {status === "Todo" ? <AddTodo /> : null}
    </div>
  );
}

export default Column;
