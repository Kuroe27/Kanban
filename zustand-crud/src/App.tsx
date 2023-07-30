// App.js
import Navigation from "./components/Layout/Navigation";
import Column from "./components/Column";

const App = () => {
  return (
    <>
      <Navigation />
      <main className="flex max-h-[92vh] min-h-[92vh] mx-auto overflow px-5">
        <Column status="Todo" />
        <Column status="Ongoing" />
        <Column status="Done" />
      </main>
    </>
  );
};

export default App;
