import React from "react";
import Image from "../../atoms/Image";

const ContactImage = ({ userImage }) => {
  return (
    <div className="h-12 w-16">
      <Image className="h-12 w-12 rounded-full" src={userImage} alt="profile" />
    </div>
  );
};

export default ContactImage;
