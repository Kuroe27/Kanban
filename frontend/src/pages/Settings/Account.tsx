import { ChangeEvent, useEffect, useState } from "react";
import LoadingBtn from "../../components/Buttons/LoadingBtn";
import apiSlice from "../../services/auth/apiSlice";
import useStore from "../../store";
interface FormFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: any;
}
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: FormFieldProps) => (
  <div className="flex flex-col p-5">
    <span className="text-white text-xl mb-2">{label}</span>
    <span className="font-extralight mb-2 text-gray-350">{placeholder}</span>
    <input
      type="text"
      className="input w-60 border-gray-700 border"
      value={value}
      onChange={onChange}
    />
  </div>
);
const Account = () => {
  const { auth } = useStore();

  if (!auth) {
    return <div>Loading...</div>;
  }

  const updateMutation = apiSlice.UpdateMutation();
  const [newName, setNewName] = useState(auth.name);
  const [newEmail, setNewEmail] = useState(auth.email);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (newName === auth.name && newEmail === auth.email) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newName, newEmail, auth.name, auth.email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutateAsync({
      name: newName,
      email: newEmail,
    });
  };
  return (
    <>
      <div className="about ">
        <h1 className="text-4xl text-white py-2 text font-light">About</h1>
        <span className="font-extralight text-gray-400">
          Set your profile name and details. Providing additional information
          like your real name can help friends find you on the KanbanFlow.
          <br />
          <br />
          Your profile name and avatar represent you throughout KanbanFlow, and
          must be appropriate for all audiences.
        </span>
      </div>
      <form>
        <h1 className="text-4xl text-white py-2 border-gray-350 border-b mb-5 font-light">
          General
        </h1>
        <div className="border-gray-700 bg-gray-800 border w-full rounded-md mb-3">
          <InputField
            label="Name"
            value={newName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewName(e.target.value)
            }
            placeholder="Please enter your full name, or a display name you are comfortable with."
          />
          <InputField
            label="Email"
            value={newEmail}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewEmail(e.target.value)
            }
            placeholder="Please enter your valid email."
          />
          <div className="px-5 py-3 flex justify-end border-t border-gray-600">
            {updateMutation.isLoading ? (
              <LoadingBtn label="Saving..." isSetting={true} />
            ) : (
              <button
                className={`${
                  !isDisabled
                    ? "bg-white text-gray-950"
                    : "text-gray-100 border border-gray-400 "
                } p-1 px-4  rounded-md`}
                onClick={handleSubmit}
                disabled={isDisabled}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Account;
