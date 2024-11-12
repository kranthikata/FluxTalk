import React, { useContext } from "react";
import ContactsContext from "../../../context/ContactsContext";
import ChatBody from "../ChatBody";
import ChatHeader from "../ChatHeader";

const ChatSelectedView = () => {
  const { activeItem } = useContext(ContactsContext);
  return (
    <div
      className={`px-4 md:left-80 h-full md:w-[calc(100vw_-_20rem)] lg:w-[calc(100vw_-_35rem)] fixed ${
        activeItem && "w-[calc(100vw-4rem)] left-16"
      }`}
    >
      <ChatHeader />
      <ChatBody />
    </div>
  );
};

export default ChatSelectedView;
