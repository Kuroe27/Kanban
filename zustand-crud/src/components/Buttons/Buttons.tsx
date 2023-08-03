import CancelBtn from "./CancelBtn";
import Confirm from "./Confirm";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

interface ButtonsProps {
  handleConfirm: () => void;
  handleCancel: () => void;
  handleEdit?: () => void;
  id?: string;
  isEditing: boolean;
  btnFuntion: string;
}

const Buttons = ({
  handleConfirm,
  handleCancel,
  handleEdit,
  id,
  isEditing,
  btnFuntion,
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
            {btnFuntion === "todo" ? (
              <>
                {handleEdit && <EditBtn handleEdit={handleEdit} />}
                {id && <DeleteBtn id={id} deleteFunction="todo" />}
              </>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Buttons;
