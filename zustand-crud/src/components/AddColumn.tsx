import { ChangeEvent, useEffect, useState } from "react";
import useStore from "../store";
import Notice from "./Icons/Notice";

const AddColumn = () => {
  const { createStatus, status, setEditStatus, editStatus } = useStore();
  const [statusName, setStatusName] = useState("");

  const handleCreateStatus = () => {
    if (statusName.trim() === "") return;
    if (!editStatus.showNotice) {
      createStatus(statusName);
    } else {
      setEditStatus({
        showSpan: true,
      });
      return;
    }
    setStatusName("");
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentStatus = status.find(
      (currentstatus) =>
        currentstatus.name.toLowerCase() === e.target.value.toLowerCase()
    );
    if (currentStatus) {
      setEditStatus({
        showNotice: true,
        showSpan: true,
      });
    } else {
      setEditStatus({
        showNotice: false,
      });
    }
    setStatusName(e.target.value);
  };

  const handleBlur = () => {
    setStatusName("");
    setEditStatus({
      showNotice: false,
      showSpan: false,
    });
  };

  useEffect(() => {
    if (editStatus.showSpan) {
      setTimeout(() => {
        setEditStatus({
          showSpan: false,
        });
      }, 3000);
    }
  }, [editStatus.showSpan]);

  return (
    <>
      <div
        className="Column min-w-[17rem] max-w-[17rem] rounded-lg mr-2 p-2 bg-gradient-to-t 
      from-gray-800 from-5% via-gray-950 via-45% to-gray-700 to-90%  "
      >
        <div className="flex items-center">
          <textarea
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            value={statusName}
            placeholder="Enter a new todo"
            className={`w-full resize-none bg-transparent p-2 rounded-md text-gray-100 placeholder:text-gray-200 outline-gray-200  `}
          />
          {editStatus.id === "" ? <Notice /> : null}
        </div>
        <button
          className="text-center text-sm w-full p-2 rounded-md text-gray-200 hover:bg-gray-300"
          onMouseDown={handleCreateStatus}
        >
          + Add Task
        </button>
      </div>
    </>
  );
};

export default AddColumn;
