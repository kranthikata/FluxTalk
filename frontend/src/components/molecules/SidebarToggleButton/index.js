import React, { useContext } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import SidebarContext from "../../../context/SidebarContext";

const SidebarToggleButton = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <Button
      onClick={toggleSidebar}
      type="button"
      className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
    >
      <Icon icon={BiMenuAltLeft} />
    </Button>
  );
};

export default SidebarToggleButton;
