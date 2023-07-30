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
      className="Column min-w-[20rem] max-w-[20rem] rounded-lg mr-2 p-2 bg-gradient-to-t 
      from-gray-50 from-10% via-gray-100 via-30% to-gray-200 to-90% hover:bg-gray-200 overflow-auto"
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
      <Todo todos={todos} />
      {status === "Todo" ? <AddTodo /> : null}
    </div>
  );
}

export default Column;
