import React from "react";
import Heading from "../../atoms/Heading";

const ContactItemName = ({ userName, timeStamp }) => {
  return (
    <div className="flex justify-between items-center mb-1 relative">
      <div className="md:w-30 w-[55%]">
        <Heading
          level={2}
          className="text-slate-800 text-sm font-bold truncate"
        >
          {userName}
        </Heading>
      </div>
      <span className="text-slate-500 text-xs w-[45%] text-right">
        {timeStamp}
      </span>
    </div>
  );
};

export default ContactItemName;
