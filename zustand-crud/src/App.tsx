// App.js
import Navigation from "./Layout/Navigation";
import Column from "./components/Column";

const App = () => {
  return (
    <>
      <Navigation />
      <section className="flex min-h-[100vh] mx-auto overflow-auto px-5">
        <Column status="Todo" />
        <Column status="Ongoing" />
        <Column status="Done" />
      </section>
    </>
  );
};

export default App;
