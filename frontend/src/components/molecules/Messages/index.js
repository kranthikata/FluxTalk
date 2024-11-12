import React, { useEffect, useRef } from "react";
import Image from "../../atoms/Image";
import { isSameSender, isLastMessage } from "../../../utils/chatUtils";
import Heading from "../../atoms/Heading";
import Paragraph from "../../atoms/Paragraph";

const Messages = ({ messages }) => {
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  const ulRef = useRef();

  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight;
    }
  });

  return (
    <>
      {messages.length !== 0 ? (
        <ul
          ref={ulRef}
          className="mt-auto overflow-y-auto custom-scrollbar flex flex-col"
        >
          {messages.map((eachMessage, index) => (
            <li key={eachMessage._id} className="flex items-center">
              {isSameSender(messages, eachMessage, index, user._id) ||
              isLastMessage(messages, index, user._id) ? (
                <Image
                  src={eachMessage.sender.image}
                  alt={eachMessage.sender.name}
                  className="w-10 h-10 rounded-full mr-1"
                />
              ) : (
                <div className="w-10 h-10 rounded-full mr-1"></div>
              )}
              <span
                className={`px-3 py-2 rounded-xl text-sm bg-gradient-to-r max-w-[50%] ${
                  eachMessage.sender._id === user._id
                    ? "from-cyan-300 to-customBlue ml-auto "
                    : "from-customGreen to-lime-300"
                }`}
              >
                {eachMessage.content}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <Image
            src="https://res.cloudinary.com/duqopzabn/image/upload/v1731075181/ChatApplication/rb_2744_hy2kpk.png"
            alt="No Chat Here"
            className="mb-2 md:h-72"
          />
          <Heading level={1} className="text-gray-900 text-xl font-medium">
            No messages here yet!
          </Heading>
          <Paragraph className="text-gray-800 text-center">
            A simple hello could lead to a million things. Start Messaging...
          </Paragraph>
        </div>
      )}
    </>
  );
};

export default Messages;
