import React, { useContext } from "react";
import Image from "../../atoms/Image";
import SidebarContext from "../../../context/SidebarContext";

const SidebarLogo = () => {
  const { expanded } = useContext(SidebarContext);
  return (
    <div
      className={`flex items-center overflow-hidden transition-all ${
        expanded ? "w-32" : "w-0"
      }`}
    >
      <Image
        src="https://res.cloudinary.com/duqopzabn/image/upload/v1729093871/ChatApplication/appLogo.png"
        className="w-7"
        alt="FluxTalk"
      />
      <span className="font-extrabold text-lg md:text-xl text-customBlue ml-2">
        Flux<span className="text-customGreen">Talk</span>
      </span>
    </div>
  );
};

export default SidebarLogo;
