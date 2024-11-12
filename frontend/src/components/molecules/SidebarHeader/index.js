import React from "react";
import SidebarLogo from "../SidebarLogo";
import SidebarToggleButton from "../SidebarToggleButton";

const SidebarHeader = () => {
  return (
    <div className="p-4 pb-2 flex justify-between items-center">
      <SidebarLogo />
      <SidebarToggleButton />
    </div>
  );
};

export default SidebarHeader;
