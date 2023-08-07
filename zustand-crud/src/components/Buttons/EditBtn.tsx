import { AiOutlineEdit } from "react-icons/ai";

interface EditProps {
  handleEdit: () => void;
}

const EditBtn = ({ handleEdit }: EditProps) => {
  return (
    <>
      <div className=" relative  group  text-lg ">
        <AiOutlineEdit onClick={handleEdit} className="button" />
        <span className="tooltip group-hover:scale-100">Edit</span>
      </div>
    </>
  );
};

export default EditBtn;
