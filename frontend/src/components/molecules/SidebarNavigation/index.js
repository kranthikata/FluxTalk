import React, { useContext } from "react";
import SidebarItem from "../SidebarItem";
import SidebarContext from "../../../context/SidebarContext";

const SidebarNavigation = ({ items }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <ul className="flex-1 px-3">
      {items.map((eachItem) => (
        <SidebarItem
          key={eachItem.id}
          icon={eachItem.icon}
          text={eachItem.text}
          expanded={expanded}
          active={eachItem.active}
        />
      ))}
    </ul>
  );
};

export default SidebarNavigation;
