import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
    <div className="flex  justify-between max-w-7xl m-auto text-gray-350 p-5 overflow-auto">
      <section className="flex flex-col w-1/4 max-w-[250px] ">
        <ul className="flex flex-col  ">
          <ListItem label={"General"} to="/account" />
          <ListItem label={"Change Password"} to="/account/password" />
        </ul>
      </section>
      <main className="w-3/4 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Settings;
