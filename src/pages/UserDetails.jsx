import { Outlet } from "react-router-dom";
import SideMenu from "../components/GlobalComponents/SideMenu";

function UserDetails() {
  return (
    <div className="h-screen ">
      <div className="flex h-full">
        <SideMenu />
        <div className="md:w-3/4 w-full h-full border-l p-20 border-gray-400">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default UserDetails;
