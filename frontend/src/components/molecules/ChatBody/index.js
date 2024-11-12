import React, { useContext } from "react";
import Messages from "../Messages";
import Icon from "../../atoms/Icon";
import { TailSpin } from "react-loader-spinner";
import MessageInputField from "../MessageInputField";
import ContactsContext from "../../../context/ContactsContext";
import MessagesContext from "../../../context/MessagesContext";

const ChatBody = () => {
  const { activeItem } = useContext(ContactsContext);
  const { activeChatMessages, messagesLoadingStatus } =
    useContext(MessagesContext);
  return (
    <div className="relative flex flex-col h-[91vh] justify-between">
      {messagesLoadingStatus === "LOADING" ? (
        <div className="w-full h-full flex justify-center items-center">
          <Icon icon={TailSpin} width={35} height={35} />
        </div>
      ) : (
        <>
          <Messages messages={activeChatMessages} />
          <MessageInputField activeItem={activeItem} />
        </>
      )}
    </div>
  );
};

export default ChatBody;
