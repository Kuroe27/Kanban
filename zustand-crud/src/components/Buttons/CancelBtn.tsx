import { RxCross2 } from "react-icons/rx";

interface CancelBtn {
  handleCancel: () => void;
}

const CancelBtn = ({ handleCancel }: CancelBtn) => {
  return (
    <>
      <RxCross2 onMouseDown={handleCancel} className="confirmation" />
    </>
  );
};

export default CancelBtn;
