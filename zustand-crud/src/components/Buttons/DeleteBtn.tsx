import { BsFillTrash3Fill } from "react-icons/bs";
import useStore from "../../store";

interface DeleteBtnProps {
  id: string;
}

const DeleteBtn = ({ id }: DeleteBtnProps) => {
  const { openModal, setTodoId } = useStore();
  const handleClick = () => {
    setTodoId(id);
    openModal(true);
  };
  return (
    <>
      <BsFillTrash3Fill
        className="text-gray-200 mr-1 cursor-pointer text-2xl"
        onClick={handleClick}
      />
    </>
  );
};

export default DeleteBtn;
