import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/DashBoardComponents/Sidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <Outlet />
    </div>
  );
}
export default AdminLayout;
