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
      <div className="column">
        <div className="flex items-center">
          <input
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            value={statusName}
            placeholder="Enter a new todo"
            className="input"
          />
          {editStatus.id === "" ? <Notice /> : null}
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
