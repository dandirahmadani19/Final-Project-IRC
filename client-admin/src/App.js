import logo from "./logo.svg";
import "./App.css";
import AdminLogin from "./views/LoginFormAdmin";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminDashboard from "./views/DashBoard";
import Table from "./components/Table";
function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />}>
          <Route path="" index element={<Table/>}/>
        </Route>
        <Route path="/login" index element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
