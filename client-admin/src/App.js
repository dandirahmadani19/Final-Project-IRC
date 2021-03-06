import logo from "./logo.svg";
import "./App.css";
import AdminLogin from "./views/LoginFormAdmin";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminDashboard from "./views/DashBoard";
import Table from "./components/Table";
import VerifyView from "./views/VerifyView";
import VerifyForm from "./components/VerifyForm";
import SuccessTable from "./components/SuccessTable";
import UpdateTrackingForm from "./components/UpdateTrackingForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminDashboard />}>
          <Route path="" index element={<Table/>}/>
          <Route path="verify" element={<VerifyView/>} >
            <Route path=":id" element={<VerifyForm/>}/>
          </Route>
          <Route path="on-progress" index element={<SuccessTable/>}/>
          <Route path="update" element={<VerifyView/>} >
            <Route path=":id" element={<UpdateTrackingForm/>}/>
          </Route>
        </Route>
        <Route path="/login" index element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
