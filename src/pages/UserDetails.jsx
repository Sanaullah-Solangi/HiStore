import { Outlet } from "react-router-dom";
import SideMenu from "../components/layout/SideMenu";

function UserDetails() {
  return (
    <div className="flex min-h-[400px]">
      <SideMenu />
      <div className="md:w-3/4 w-full h-full border-l border-gray-400">
        <Outlet />
      </div>
    </div>
  );
}
export default UserDetails;
