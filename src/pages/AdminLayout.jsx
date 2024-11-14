import { Outlet } from "react-router-dom";
import SideMenu from "../components/GlobalComponents/SideMenu";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      <div className="min-h-full w-full md:w-3/4 flex flex-col justify-start items-star">
        <Outlet />
      </div>
    </div>
  );
}
export default AdminLayout;
