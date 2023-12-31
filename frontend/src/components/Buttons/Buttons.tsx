import CancelBtn from "./CancelBtn";
import Confirm from "./Confirm";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

interface ButtonsProps {
  handleConfirm: () => void;
  handleCancel: () => void;
  handleEdit?: () => void;
  _id?: string;
  isEditing: boolean;
  btnFunction?: string;
}

const Buttons = ({
  handleConfirm,
  handleCancel,
  handleEdit,
  _id,
  isEditing,
  btnFunction,
}: ButtonsProps) => {
  return (
    <>
      {isEditing ? (
        <div className="flex justify-end text-4xl text-gray-200 mb-2 ">
          <Confirm handleConfirm={handleConfirm} />
          <CancelBtn handleCancel={handleCancel} />
        </div>
      ) : (
        <>
          <div className="flex justify-end text-xl">
            {btnFunction === "task" ? (
              <>
                {handleEdit && <EditBtn handleEdit={handleEdit} />}
                {_id && <DeleteBtn id={_id} deleteFunction="task" />}
              </>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Buttons;
