import { BsFillTrash3Fill } from "react-icons/bs";
import useStore, { ModalProps } from "../../store";

const DeleteBtn = ({ id, deleteFunction }: ModalProps) => {
  const { openModal, setHover } = useStore();

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleClick = () => {
    openModal({
      id: id,
      activateModal: true,
      deleteFunction: deleteFunction,
    });
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BsFillTrash3Fill
        className="text-gray-200 mr-1 cursor-pointer text-base"
        onClick={handleClick}
      />
      <span className="tooltip group-hover:scale-100">Delete</span>
    </div>
  );
};

export default DeleteBtn;
