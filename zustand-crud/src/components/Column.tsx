import { shallow } from "zustand/shallow";
import useStore from "../store";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

function Column({ status }) {
  const todos = useStore(
    (state) => state.todos.filter((todo) => todo.status === status),
    shallow
  );
  const { draggedTodo, setDraggedTodo, updateStatus } = useStore();

  return (
    <div
      className="Column min-w-[20rem] max-w-[20rem] bg-gray-200 p-5 mr-2"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        updateStatus(draggedTodo, status);
        setDraggedTodo(null);
      }}
    >
      <h1>{status}</h1>
      {status === "Todo" ? <AddTodo /> : null}
      <Todo todos={todos} />
    </div>
  );
}

export default Column;
