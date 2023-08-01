import { useState } from "react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const options = ["One", "Two", "Three is the magic number"];

  return (
    <div className="p-10">
      <div className="dropdown inline-block relative">
        <button
          onClick={toggleDropdown}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span className="mr-1">Dropdown</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 10.293a1 1 0 011.414 0L10 11.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <ul className="dropdown-menu absolute bg-gradient-to-t from-gray-800 from-5% via-gray-950 via-45% to-gray-700 to-90% rounded-lg p-2 text-gray-100">
            {options.map((option, index) => (
              <li key={index} className="">
                <a
                  className={`${
                    index === 0
                      ? "rounded-t"
                      : index === options.length - 1
                      ? "rounded-b"
                      : ""
                  } bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap`}
                  href="#"
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
