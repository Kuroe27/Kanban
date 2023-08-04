import { RxCross2 } from "react-icons/rx";

interface CancelBtn {
  handleCancel: () => void;
}

const CancelBtn = ({ handleCancel }: CancelBtn) => {
  return (
    <>
      <RxCross2
        onMouseDown={handleCancel}
        className="bg-gray-300 p-1 hover:bg-gray-600  text-2xl"
      />
    </>
  );
};

export default CancelBtn;
