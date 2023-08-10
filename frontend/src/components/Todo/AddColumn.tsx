import { ChangeEvent, useEffect, useState } from "react";
import useStore from "../../store";
import Notice from "../Icons/Notice";
import { AiOutlinePlus } from "react-icons/ai";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentStatus = status.find(
      (currentstatus) =>
        currentstatus.name.toLowerCase() === e.target.value.toLowerCase()
    );

    setEditStatus({
      id: "Add Column",
      showNotice: !!currentStatus,
      showSpan: !!currentStatus,
    });
    setStatusName(e.target.value);
  };

  const handleBlur = () => {
    setEditStatus({
      id: "",
      showNotice: false,
      showSpan: false,
    });
    setStatusName("");
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
      <div className="column">
        <div className="flex items-center">
          <input
            onClick={() => setEditStatus({ id: "Add Column" })}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            value={statusName}
            placeholder="Enter a new todo"
            className="input"
          />
          {editStatus.id === "Add Column" ? <Notice /> : null}
          <AiOutlinePlus
            className="button  text-3xl text-white"
            onMouseDown={handleCreateStatus}
          />
        </div>
      </div>
    </>
  );
};

export default AddColumn;
