// Column.tsx
import { shallow } from "zustand/shallow";
import useStore from "../store";
import AddTodo from "./AddTodo";
import Todo from "./Todo";
interface ColumnProps {
  status: string;
}

function Column({ status }: ColumnProps) {
  const todos = useStore(
    (state) => state.todos.filter((todo) => todo.status === status),
    shallow
  );
  const { draggedTodo, setDraggedTodo, updateStatus } = useStore();

  return (
    <div
      className="Column min-w-[20rem] max-w-[20rem] bg-gray-200 p-5 mr-2 rounded-md"
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
      <h1 className="mb-2 p-2">{status}</h1>
      {status === "Todo" ? <AddTodo /> : null}
      <Todo todos={todos} />
    </div>
  );
}

export default Column;
