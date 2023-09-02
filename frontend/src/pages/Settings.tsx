import useStore from "../store";
import Account from "./Settings/Account";

const ListItem = ({ label }: { label: string }) => {
  return (
    <li className="w-full text-start p-2 rounded-lg hover:text-gray-100 hover:bg-gray-500">
      {label}
    </li>
  );
};
const Settings = () => {
  const { auth } = useStore();

  if (!auth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between h-screen max-w-7xl m-auto text-gray-350 p-5 overflow-auto">
      <ul className=" w-1/4  max-w-[250px]">
        <ListItem label={"General"} />
      </ul>
      <main className="w-3/4 overflow-hidden">
        <Account />
      </main>
    </div>
  );
};

export default Settings;
