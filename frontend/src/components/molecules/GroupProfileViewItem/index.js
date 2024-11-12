import React from "react";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Icon from "../../atoms/Icon";
import Image from "../../atoms/Image";
import Heading from "../../atoms/Heading";
import Paragraph from "../../atoms/Paragraph";
import { getUserName } from "../../../utils/chatUtils";

const GroupProfileViewItem = ({ currentUser, activeItem }) => {
  const { user } = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <li className="border-b mb-2">
      <Image
        src={currentUser.image}
        alt="user profile"
        className="w-full rounded-lg mb-1"
      />
      <div className="flex flex-col justify-center ml-4 mb-2">
        <div className="flex">
          <Icon icon={CiUser} size={25} />
          <Heading level={2} className="ml-2">
            {getUserName(user, activeItem, currentUser)}
          </Heading>
        </div>
        <div className="flex">
          <Icon icon={CiMail} size={25} />
          <Paragraph className="ml-2">{currentUser.email}</Paragraph>
        </div>
      </div>
    </li>
  );
};

export default GroupProfileViewItem;
