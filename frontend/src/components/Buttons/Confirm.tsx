import { AiOutlineCheck } from "react-icons/ai";

interface ConfirmProps {
  handleConfirm: () => void;
}

const Confirm = ({ handleConfirm }: ConfirmProps) => {
  return (
    <>
      <AiOutlineCheck
        onMouseDown={handleConfirm}
        className="confirmation mr-2"
      />
    </>
  );
};

export default Confirm;
