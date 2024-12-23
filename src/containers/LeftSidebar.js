import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";
import AdminSidebar from "../routes/AdminSideBar";
import WorkerSidebar from "../routes/WorkerSideBar";

function LeftSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const routes = user.role === "admin" ? AdminSidebar : WorkerSidebar; // Dynamically select routes
  
  
  const close = () => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side z-30">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 w-50 bg-base-100 min-h-full text-base-content">
        {/* Close Button */}
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        {/* Logo and Title */}
        <div className="flex items-center mb-4 space-x-3 text-xl font-semibold text-gray-800">
          <img
            className="mask mask-squircle w-10 h-10 object-cover"
            src="/logo192.png"
            alt="Hecht Museum Logo"
          />
          <span className="text-black-600">The Hecht Museum</span>
        </div>

        {/* Sidebar Routes */}
        {routes.map((route, k) => (
          <li className="" key={k}>
            {route.submenu ? (
              <SidebarSubmenu {...route} />
            ) : (
              <NavLink
                end
                to={route.path}
                className={({ isActive }) =>
                  `group flex items-center space-x-3 py-3 px-4 rounded-lg border-2 
                  ${
                    isActive
                      ? "bg-primary text-white font-bold border-primary"
                      : "bg-gray-50 text-gray-800 border-gray-300 shadow-md hover:bg-gray-100"
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`
                }
              >
                <span>{route.icon}</span>
                <span className="text-md font-semibold">{route.name}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeftSidebar;
