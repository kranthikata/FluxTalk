import React, { useContext } from "react";
import Icon from "../../atoms/Icon";
import SidebarContext from "../../../context/SidebarContext";

const SidebarItem = ({ icon, text, active }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer  ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <Icon icon={icon} size={25} />
      {expanded && (
        <span className="overflow-hidden transition-all w-52 ml-3">{text}</span>
      )}
    </li>
  );
};

export default SidebarItem;
