import { BsFillExclamationDiamondFill } from "react-icons/bs";
import useStore from "../../store";

const Notice = () => {
  const { editStatus } = useStore();
  return (
    <>
      {editStatus.showNotice ? (
        <>
          <div className="   group ">
            <BsFillExclamationDiamondFill className="text-4xl text-yellow-600 p-2" />
          </div>
          <span
            className={`absolute tooltip top-[2.5rem] left-[-7rem] text-xs scale-100 ${
              editStatus.showSpan ? "scale-100" : "scale-0"
            } group-hover:scale-100`}
          >
            Status name already taken
          </span>
        </>
      ) : null}
    </>
  );
};

export default Notice;
