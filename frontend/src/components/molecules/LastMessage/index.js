import React from "react";
import Paragraph from "../../atoms/Paragraph";

const LastMessage = ({ lastmessage }) => {
  return (
    <Paragraph className="text-slate-700 font-medium text-xs w-[60vw] md:w-36 truncate">
      {lastmessage}
    </Paragraph>
  );
};

export default LastMessage;
