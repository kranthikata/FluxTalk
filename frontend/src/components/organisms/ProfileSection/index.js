import React, { useContext } from "react";
import Heading from "../../atoms/Heading";
import SingleProfileView from "../../molecules/SingleProfileView";
import GroupProfileView from "../../molecules/GroupProfileView";
import ContactsContext from "../../../context/ContactsContext";
import Button from "../../atoms/Button";
import { getChatDetails } from "../../../utils/chatUtils";

const ProfileSection = () => {
  const { activeItem, handleDeleteChat } = useContext(ContactsContext);
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  if (activeItem) {
    var [userName, userImage] = getChatDetails(user._id, activeItem);
    if (activeItem.users[0].email === user.email) {
      var userEmail = activeItem.users[1].email;
    } else {
      userEmail = activeItem.users[0].email;
    }
  }
  return (
    <div
      className={`border-l hidden p-4 fixed right-0 w-60 h-full ${
        activeItem && "lg:block"
      }`}
    >
      <Heading
        level={2}
        className="text-slate-800 font-bold text-xl text-center"
      >
        Profile
      </Heading>
      <hr className="mt-5 mb-2" />
      {activeItem &&
        (!activeItem.isGroupChat ? (
          <>
            <SingleProfileView
              userName={userName}
              userEmail={userEmail}
              userImage={userImage}
            />
            <div className="text-center">
              <Button
                type="button"
                onClick={() => handleDeleteChat(activeItem._id)}
                className="border border-red-500 w-full py-2 rounded-xl hover:bg-red-500 hover:text-white"
              >
                Delete
              </Button>
            </div>
          </>
        ) : (
          <GroupProfileView />
        ))}
    </div>
  );
};

export default ProfileSection;
