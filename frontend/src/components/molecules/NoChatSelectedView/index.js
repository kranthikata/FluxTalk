import React from "react";
import Image from "../../atoms/Image";
import Heading from "../../atoms/Heading";

const NoChatSelectedView = () => (
  <div className="p-4 left-80 h-full md:w-[calc(100vw_-_20rem)] fixed hidden md:block">
    <div className="flex h-full justify-center items-center flex-col">
      <Image
        src="https://res.cloudinary.com/duqopzabn/image/upload/v1728922312/ChatApplication/no-chat_hjgcpa.gif"
        alt="No Chat"
        className="lg:h-64 h-48"
      />
      <Heading level={2} className="font-semibold text-sm md:text-md">
        No chats open. Pick someone and make your day more social!
      </Heading>
    </div>
  </div>
);

export default NoChatSelectedView;
