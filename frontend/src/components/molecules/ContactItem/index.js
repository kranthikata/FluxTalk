import React from "react";
import ContactGroupImage from "../ContactGroupImage";
import ContactImage from "../ContactImage";
import ContactItemName from "../ContactItemName";
import LastMessage from "../LastMessage";
import { getChatDetails, getTimeStamp } from "../../../utils/chatUtils";

const ContactItem = ({ isActive, onSelectItem, chatDetails }) => {
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  const [chatName, chatImage] = getChatDetails(user._id, chatDetails);
  let timeStamp;
  if (chatDetails.lastMessage) {
    timeStamp = getTimeStamp(chatDetails.lastMessage.updatedAt);
  } else {
    timeStamp = getTimeStamp(chatDetails.updatedAt);
  }
  return (
    <li
      onClick={onSelectItem}
      className={`flex justify-between mb-1 rounded-md hover:bg-gradient-to-r from-customBlue to-customGreen p-1 cursor-pointer ${
        isActive && "bg-gradient-to-r from-customBlue to-customGreen"
      }`}
    >
      {chatDetails.isGroupChat ? (
        <ContactGroupImage chatDetails={chatDetails} />
      ) : (
        <ContactImage userImage={chatImage} />
      )}
      <div className="flex flex-col justify-center md:w-[69%] w-[89%]">
        <ContactItemName userName={chatName} timeStamp={timeStamp} />
        {chatDetails.lastMessage && (
          <LastMessage lastmessage={chatDetails.lastMessage.content} />
        )}
      </div>
    </li>
  );
};

export default ContactItem;
