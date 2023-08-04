import { BsFillTrash3Fill } from "react-icons/bs";
import useStore, { ModalProps } from "../../store";

const DeleteBtn = ({ id, deleteFunction }: ModalProps) => {
  const { openModal } = useStore();
  const handleClick = () => {
    openModal({
      id: id,
      activateModal: true,
      deleteFunction: deleteFunction,
    });
  };
  return (
    <div className=" relative  group ">
      <BsFillTrash3Fill
        className="text-gray-200 mr-1 cursor-pointer text-lg"
        onClick={handleClick}
      />
      <span className="tooltip group-hover:scale-100">Delete</span>
    </div>
  );
};

export default DeleteBtn;
