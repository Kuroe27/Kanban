import { BsFillExclamationDiamondFill } from "react-icons/bs";
import useStore from "../../store";

const Notice = () => {
  const { editStatus } = useStore();
  return (
    <>
      {editStatus.showNotice ? (
        <>
          <div className=" relative  group ">
            <BsFillExclamationDiamondFill className="text-4xl text-yellow-600 p-2" />

            <span
              className={`absolute tooltip top-[1.5rem] left-[-15rem] text-xs p-7 px-16 scale-100 `}
            >
              Status name already taken
            </span>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Notice;
