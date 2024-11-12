import React from "react";
import Heading from "../../atoms/Heading";

const SidebarUserDetails = ({ username, email }) => {
  return (
    <div className="leading-4">
      <Heading level={4} className="font-semibold">
        {username}
      </Heading>
      <span className="text-xs text-gray-600">{email}</span>
    </div>
  );
};

export default SidebarUserDetails;
