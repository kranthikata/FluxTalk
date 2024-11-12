import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import SidebarLogout from "../SidebarLogout";

const SidebarThreeDots = ({ onClickThreeDots, onLogout, isMenuOpened }) => {
  return (
    <>
      <Button type="button" onClick={onClickThreeDots}>
        <Icon icon={BsThreeDotsVertical} size={18} />
      </Button>
      {isMenuOpened && <SidebarLogout onLogout={onLogout} />}
    </>
  );
};

export default SidebarThreeDots;
