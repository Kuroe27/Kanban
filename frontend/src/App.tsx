// App.js
import { ToastContainer } from "react-toastify";
import Navigation from "./components/Layout/Navigation";
import Dashboard from "./pages/Dashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Settings from "./pages/Settings";
import Account from "./pages/Settings/Account";
import ChangePass from "./pages/Settings/ChangePass";
import List from "./pages/Dashboard/List";
import Board from "./pages/Dashboard/Board";
const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Board />} />
              <Route path="list" element={<List />} />
            </Route>
            <Route path="account" element={<Settings />}>
              <Route index element={<Account />} />
              <Route path="password" element={<ChangePass />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
