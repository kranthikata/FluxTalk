import React from "react";
import Button from "../../atoms/Button";

const SidebarLogout = ({ onLogout }) => {
  return (
    <div className="absolute left-5 bottom-10 mt-2 w-48 bg-white border rounded-lg drop-shadow-2xl">
      <Button
        onClick={onLogout}
        type="button"
        className="px-4 py-2 text-gray-800 hover:bg-red-400 hover:text-white rounded-md w-full"
      >
        Log Out
      </Button>
    </div>
  );
};

export default SidebarLogout;
