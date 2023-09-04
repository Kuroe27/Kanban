import { useState } from "react";
import useStore from "../../store";
import apiSlice from "../../services/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const { auth } = useStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const logoutMutation = apiSlice.logoutMutation();
  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <nav className="h-16 flex text-center items-center px-5 bg-gray-900 border-b-2 border-gray-700 justify-between sticky top-0 z-50">
      <h2
        className="text-2xl text-white font-mono cursor-pointer"
        onClick={() => navigate("/")}
      >
        KanbanFlow
      </h2>
      {auth ? (
        <div className="relative">
          <div
            onClick={togglePopover}
            className="w-10 h-10 bg-gray-600 rounded-3xl cursor-pointer"
          ></div>
          {isPopoverOpen && (
            <div className="absolute   z-10 top-full right-5 mt-2 w-60 bg-gray-900 border border-gray-600 rounded shadow-lg text-gray-400">
              {/* <p className="px-3  ">{auth.email}</p> */}
              <div className="py-2 ">
                <button
                  className="hover:text-gray-100 hover:bg-gray-500 text-start w-full p-2 px-3"
                  onClick={() => navigate("/account")}
                >
                  Settings
                </button>
                <button
                  className="hover:text-gray-100 hover:bg-gray-500 text-start w-full p-2 px-3"
                  onClick={() => logoutMutation.mutateAsync()}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </nav>
  );
};

export default Navigation;
