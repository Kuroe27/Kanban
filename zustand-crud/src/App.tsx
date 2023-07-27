import Column from "./components/Column";

const App = () => {
  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <div className="flex justify-center">
        <Column status="Todo" />
        <Column status="Ongoing" />
        <Column status="Done" />
      </div>
    </div>
  );
};

export default App;
