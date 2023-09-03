import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Account from "./Settings/Account";
import ChangePass from "./Settings/ChangePass";

const ListItem = ({ label, to }: { label: string; to: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Check if the current location matches the 'to' prop
  const isActive = location.pathname === to;

  return (
    <li
      className={`w-full cursor-pointer text-start p-2 rounded-lg ${
        isActive
          ? "text-white "
          : "text-gray-350 hover:text-gray-100 hover:bg-gray-500"
      }`}
      onClick={() => navigate(to)}
    >
      {label}
    </li>
  );
};

const Settings = () => {
  return (
    <div className="flex justify-between h-screen max-w-7xl m-auto text-gray-350 p-5 overflow-auto">
      <ul className="w-1/4 max-w-[250px]">
        <ListItem label={"General"} to="/account" />
        <ListItem label={"Change Password"} to="/account/password" />
      </ul>
      <main className="w-3/4 overflow-hidden">
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path="/password" element={<ChangePass />} />
        </Routes>
      </main>
    </div>
  );
};

export default Settings;
