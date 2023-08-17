// App.js
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Layout/Navigation";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <>
      <Navigation />
      <Dashboard />
      <ToastContainer />
    </>
  );
};

export default App;
