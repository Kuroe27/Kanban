import { useState, useRef } from "react"; // Import MouseEvent
import useStore from "../../store";
import apiSlice from "../../services/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const { auth } = useStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false); // Set the type of isPopoverOpen
  const logoutMutation = apiSlice.logoutMutation();
  const popoverRef = useRef<HTMLDivElement | null>(null); // Set the type of popoverRef

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = (event: MouseEvent) => {
    // Check if the click was outside of the popover
    if (
      popoverRef.current &&
      !popoverRef.current?.contains(event.target as Node)
    ) {
      setIsPopoverOpen(false);
    }
  };

  // Add click event listener to the document when the popover is open
  if (isPopoverOpen) {
    document.addEventListener("click", closePopover);
  } else {
    // Remove the click event listener when the popover is closed
    document.removeEventListener("click", closePopover);
  }

  return (
    <nav className="h-16 flex text-center items-center px-5 bg-gray-900 border-b-2 border-gray-700 justify-between sticky top-0 z-50">
      <h2
        className="text-2xl text-white font-inter cursor-pointer"
        onClick={() => navigate("/")}
      >
        KanbanFlow
      </h2>
      {auth ? (
        <div className="relative" ref={popoverRef}>
          <div
            onClick={togglePopover}
            className="w-10 h-10 bg-gray-600 rounded-3xl cursor-pointer"
          ></div>
          {isPopoverOpen && (
            <div className="absolute   z-10 top-full right-5 mt-2 w-60 bg-gray-900 border border-gray-600 rounded shadow-lg text-gray-400">
              <div className="py-2 ">
                <button
                  className="hover:text-gray-100 hover:bg-gray-500 text-start w-full p-2 px-3"
                  onClick={() => {
                    setIsPopoverOpen(false);
                    navigate("/account");
                  }}
                >
                  Settings
                </button>
                <button
                  className="hover:text-gray-100 hover:bg-gray-500 text-start w-full p-2 px-3"
                  onClick={() => {
                    setIsPopoverOpen(false);
                    logoutMutation.mutateAsync();
                  }}
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
