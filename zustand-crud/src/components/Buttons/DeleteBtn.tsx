import { BsFillTrash3Fill } from "react-icons/bs";
import useStore from "../../store";

interface DeleteBtnProps {
  id: string;
  deleteFunction: string;
}

const DeleteBtn = ({ id, deleteFunction }: DeleteBtnProps) => {
  const { openModal } = useStore();
  const handleClick = () => {
    openModal(true, id, deleteFunction);
  };
  return (
    <div className=" relative  group ">
      <BsFillTrash3Fill
        className="text-gray-200 mr-1 cursor-pointer text-2xl"
        onClick={handleClick}
      />
      <span className="tooltip group-hover:scale-100">Delete</span>
    </div>
  );
};

export default DeleteBtn;
