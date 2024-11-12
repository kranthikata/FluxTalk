import React, { useContext } from "react";
import ContactsContext from "../../../context/ContactsContext";
import ChatSelectedView from "../../molecules/ChatSelectedView";
import NoChatSelectedView from "../../molecules/NoChatSelectedView";
import UpdateGroupChatModel from "../../organisms/UpdateGroupChatModel";
import ModelContext from "../../../context/ModelContext";

const ChatSection = () => {
  const { activeItem } = useContext(ContactsContext);
  const { showUpdateModel } = useContext(ModelContext);
  return (
    <>
      {activeItem ? <ChatSelectedView /> : <NoChatSelectedView />}
      {showUpdateModel && <UpdateGroupChatModel />}
    </>
  );
};

export default ChatSection;
