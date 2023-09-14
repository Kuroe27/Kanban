import { ChangeEvent, useEffect, useState } from "react";
import LoadingBtn from "../../components/Buttons/LoadingBtn";
import apiSlice from "../../services/auth/authSlice";
import useStore from "../../store";
import InputField from "../../components/Inputs/InputField";

const Account = () => {
  const { auth } = useStore();

  if (!auth) {
    return <div>Loading...</div>;
  }

  const updateMutation = apiSlice.UpdateMutation();
  const deleteMutation = apiSlice.DeleteMutation();
  const [newName, setNewName] = useState(auth.name);
  const [newEmail, setNewEmail] = useState(auth.email);
  const [isDisabled, setDisabled] = useState(false);
  const logoutMutation = apiSlice.logoutMutation();
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
  const handleUserDelete = () => {
    deleteMutation.mutateAsync();
    logoutMutation.mutateAsync();
  };
  return (
    <>
      <div className="about  ">
        <h1 className="text-2xl text-white py-2 text font-light">About</h1>
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
        <h1 className="text-2xl text-white py-2 border-gray-350 border-b mb-5 font-light">
          General
        </h1>
        <div className="border-gray-700 bg-gray-800 border w-full rounded-md mb-3 pt-5">
          <InputField
            type="text"
            label="Name"
            value={newName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewName(e.target.value)
            }
            placeholder="Please enter your full name, or a display name you are comfortable with."
          />
          <InputField
            type="text"
            label="Email"
            value={newEmail}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewEmail(e.target.value)
            }
            placeholder="Please enter your valid email."
          />
          <div className="px-5 py-2 flex justify-end border-t border-gray-600">
            {updateMutation.isLoading ? (
              <LoadingBtn label="Saving..." isSetting={true} />
            ) : (
              <button
                className={`${
                  !isDisabled
                    ? "bg-white text-gray-950"
                    : "text-gray-100 border border-gray-400  cursor-not-allowed "
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
      <div className="border-red-600 bg-gray-800 border w-full rounded-md mb-3">
        <div className="p-5">
          <h1 className="text-2xl text-white py-2 font-light">
            Delete Account
          </h1>
          <span className=" text-gray-400">
            Permanently eliminate your Personal Account along with all its
            associated contents from the KanbanFlow platform. Please be aware
            that this action cannot be undone, so proceed with care.
          </span>
        </div>

        <div className="px-5 py-3 flex justify-end border-t border-gray-600  bg-[#e43c3c36]">
          {deleteMutation.isLoading ? (
            <LoadingBtn label="Deleting..." isSetting={true} />
          ) : (
            <button
              className="text-gray-100 border  bg-red-500  p-1 px-4  rounded-md hover:bg-red-400 cursor-pointer"
              onClick={handleUserDelete}
            >
              Delete Account
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
