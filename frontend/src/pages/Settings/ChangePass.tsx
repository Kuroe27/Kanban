import { ChangeEvent, useEffect, useState } from "react";
import LoadingBtn from "../../components/Buttons/LoadingBtn";
import InputField from "../../components/Inputs/InputField";
import apiSlice from "../../services/auth/authSlice";

const ChangePass = () => {
  const [isDisabled, setDisabled] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePass = apiSlice.UpdatePasswordMutation();
  const [error, setError] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPass === confirmPassword) {
      updatePass.mutateAsync({
        password: currentPass,
        newPassword: newPass,
      });
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!currentPass && newPass === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [currentPass, newPass]);

  return (
    <form className="">
      <h1 className="text-4xl text-white py-2 border-gray-350 border-b mb-5 font-light">
        Change Password
      </h1>
      <div className="border-gray-700 bg-gray-800 border w-full rounded-md mb-3">
        <InputField
          value={currentPass}
          type="password"
          label="Current Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCurrentPass(e.target.value)
          }
        />

        <InputField
          value={newPass}
          type="password"
          label="New Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPass(e.target.value)
          }
        />

        <InputField
          type="password"
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />

        <div
          className={`${
            error ? "justify-between" : "justify-end"
          } px-5 py-3 flex  border-t border-gray-600`}
        >
          {error ? (
            <p className="text-red-500 text-start mb-2">
              Passwords do not match *
            </p>
          ) : null}

          {updatePass.isLoading ? (
            <LoadingBtn label="Changing Password" isSetting={true} />
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
              Change Password
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ChangePass;
