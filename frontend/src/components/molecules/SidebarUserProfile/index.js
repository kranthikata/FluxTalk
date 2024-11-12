import React, { useContext } from "react";
import Image from "../../atoms/Image";
import SidebarThreeDots from "../SidebarThreeDots";
import SidebarUserDetails from "../SidebarUserDetails";
import SidebarContext from "../../../context/SidebarContext";

const SidebarUserProfile = ({ user, onLogout, onClick, isMenuOpened }) => {
  const { expanded } = useContext(SidebarContext);
  const userName = user?.name;
  const userImage = user?.image;
  const userEmail = user?.email;
  return (
    <div className="border-t flex p-3">
      <Image
        src={userImage}
        alt={userName}
        className={`w-10 h-10 rounded-full ${!expanded && "cursor-pointer"}`}
        onClick={onClick}
      />
      <div
        className={`flex justify-between items-center overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0 -mb-4"
        }`}
      >
        <SidebarUserDetails username={userName} email={userEmail} />
        <SidebarThreeDots
          onClickThreeDots={onClick}
          onLogout={onLogout}
          isMenuOpened={isMenuOpened}
        />
      </div>
    </div>
  );
};

export default SidebarUserProfile;
