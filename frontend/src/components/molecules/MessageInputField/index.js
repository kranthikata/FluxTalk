import React, { useContext } from "react";
import { BiSolidSend } from "react-icons/bi";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import MessagesContext from "../../../context/MessagesContext";

const MessageInputField = ({ activeItem }) => {
  const { handleSendMessage, newMessage, setNewMessage } =
    useContext(MessagesContext);
  const onClickEnter = (event) => {
    if (event.key === "Enter" && newMessage !== "") {
      handleSendMessage(newMessage, activeItem._id);
    }
  };
  return (
    <div className="rounded-full flex items-center justify-around mb-2">
      <Input
        type="text"
        name="message"
        onChange={(event) => setNewMessage(event.target.value)}
        onKeyDown={onClickEnter}
        value={newMessage}
        placeholder="Your Message"
        className="w-full border py-2 rounded-full px-3 outline-none "
      />

      <Button
        onClick={() => handleSendMessage(newMessage, activeItem._id)}
        className="rounded-full h-full flex items-center justify-center px-2 bg-gradient-to-bl from-customGreen to-customBlue"
      >
        <Icon icon={BiSolidSend} className="text-white" size="22" />
      </Button>
    </div>
  );
};

export default MessageInputField;
