import React from "react";
import { CiMail } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Image from "../../atoms/Image";
import Icon from "../../atoms/Icon";
import Heading from "../../atoms/Heading";
import Paragraph from "../../atoms/Paragraph";

const SingleProfileView = ({ userImage, userName, userEmail }) => {
  return (
    <div>
      <Image
        src={userImage}
        alt="user profile"
        className="w-full rounded-lg mb-1"
      />
      <div className="flex flex-col justify-center ml-4 my-2">
        <div className="flex">
          <Icon icon={CiUser} size={25} />
          <Heading level={2} className="ml-2">
            {userName}
          </Heading>
        </div>
        <div className="flex">
          <Icon icon={CiMail} size={25} />
          <Paragraph className="ml-2">{userEmail}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default SingleProfileView;
