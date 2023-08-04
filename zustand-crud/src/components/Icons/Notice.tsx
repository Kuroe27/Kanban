import { BsFillExclamationDiamondFill } from "react-icons/bs";
import useStore from "../../store";

const Notice = () => {
  const { editStatus } = useStore();
  return (
    <>
      {editStatus.showNotice ? (
        <>
          <div className=" relative  group ">
            <BsFillExclamationDiamondFill className="text-5xl text-yellow-600 p-2" />

            <span
              className={`absolute tooltip top-[2.5rem] left-[-7rem] text-base p-4 ${
                editStatus.showSpan ? "scale-100" : "scale-0"
              } group-hover:scale-100`}
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
