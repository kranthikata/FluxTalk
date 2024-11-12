import React from "react";
import Button from "../../atoms/Button";
import Image from "../../atoms/Image";
import Paragraph from "../../atoms/Paragraph";

const SearchResultItem = ({ createChatWithUser, image, username, id }) => {
  return (
    <li className="w-full mb-1 hover:bg-gradient-to-r from-cyan-300 to-lime-300 rounded-md border py-1">
      <Button
        className="flex items-center ml-2"
        onClick={() => createChatWithUser(id)}
      >
        <Image src={image} className="w-10 h-10 rounded-full" alt={username} />
        <Paragraph className="ml-2">{username}</Paragraph>
      </Button>
    </li>
  );
};

export default SearchResultItem;
