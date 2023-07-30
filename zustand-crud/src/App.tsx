// App.js
import Navigation from "./components/Layout/Navigation";
import Column from "./components/Column";

const App = () => {
  return (
    <>
      <Navigation />
      <main className="flex max-h-[93.9vh] min-h-[93.9vh] mx-auto overflow p-5 bg-gray-800">
        <Column status="Todo" />
        <Column status="Ongoing" />
        <Column status="Done" />
      </main>
    </>
  );
};

export default App;
