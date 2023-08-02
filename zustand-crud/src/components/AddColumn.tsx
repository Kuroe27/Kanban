import { ChangeEvent, useEffect, useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import useStore from "../store";

const AddColumn = () => {
  const [statusName, setStatusName] = useState("");
  const { createStatus, status } = useStore();
  const [notice, setNotice] = useState(false);
  const [showSpan, setShowSpan] = useState(false);

  const handleCreateStatus = () => {
    if (!notice) {
      createStatus(statusName);
    } else {
      setShowSpan(true);
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
      setNotice(true);
    } else {
      setNotice(false);
    }
    setStatusName(e.target.value);
  };
  useEffect(() => {
    if (showSpan) {
      setTimeout(() => {
        setShowSpan(false);
      }, 3000);
    }
  }, [showSpan]);
  return (
    <>
      <div
        className="Column min-w-[25rem] max-w-[25rem] rounded-lg mr-2 p-2 bg-gradient-to-t 
      from-gray-800 from-5% via-gray-950 via-45% to-gray-700 to-90%  "
      >
        <div className="flex  items-center">
          <textarea
            onChange={(e) => handleChange(e)}
            value={statusName}
            placeholder="Enter a new todo"
            className={`w-full resize-none bg-transparent p-2 rounded-md text-gray-100 placeholder:text-gray-200 outline-gray-200  `}
          />
          {notice ? (
            <>
              <div className=" relative  group ">
                <BsFillExclamationDiamondFill className="text-5xl text-yellow-600 p-2" />

                <span
                  className={`absolute tooltip top-[2.5rem] left-[-7rem] text-base p-4 ${
                    showSpan ? "scale-100" : "scale-0"
                  } group-hover:scale-100`}
                >
                  Status name already taken
                </span>
              </div>
            </>
          ) : null}
        </div>

        <button
          className="text-center text-xl w-full p-2 rounded-md text-gray-200 hover:bg-gray-300"
          onClick={handleCreateStatus}
        >
          + Add Task
        </button>
      </div>
    </>
  );
};

export default AddColumn;
