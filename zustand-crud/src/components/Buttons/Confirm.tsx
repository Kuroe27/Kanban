import { AiOutlineCheck } from "react-icons/ai";

interface ConfirmProps {
  handleConfirm: () => void;
}

const Confirm = ({ handleConfirm }: ConfirmProps) => {
  return (
    <>
      <AiOutlineCheck
        onMouseDown={handleConfirm}
        className="bg-gray-300 p-1 mr-2 hover:bg-gray-600 text-2xl"
      />
    </>
  );
};

export default Confirm;
