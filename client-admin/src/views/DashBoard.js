import SideBar from "../components/SideBar"
import {Outlet} from 'react-router-dom'
export default function AdminDashboard(){
  return (
    <div class="flex">
      <SideBar />
      <div class="w-full h-full min-h-[80vh] p-4 m-8 overflow-y-auto bg-slate-100">
        <div class="flex items-center justify-center p-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  )
}