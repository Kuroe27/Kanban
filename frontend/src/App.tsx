// App.js
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Layout/Navigation";
import Dashboard from "./pages/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/Routes/PrivateRoute";
const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
