import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }) => {
   return (
      <div>
         {children}
         <Outlet />
      </div>
   );
};

export default MainLayout;
