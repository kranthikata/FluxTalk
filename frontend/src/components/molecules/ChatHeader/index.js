import React, { useContext } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import Heading from "../../atoms/Heading";
import ContactsContext from "../../../context/ContactsContext";
import ContactGroupImage from "../ContactGroupImage";
import ContactImage from "../ContactImage";
import { getChatDetails } from "../../../utils/chatUtils";
import ModelContext from "../../../context/ModelContext";
import { TailSpin } from "react-loader-spinner";

const ChatHeader = () => {
  const { deselectActiveItem, isDeleteLoading, activeItem, handleDeleteChat } =
    useContext(ContactsContext);
  const { setShowUpdateModel } = useContext(ModelContext);
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  const [chatName, chatImage] = getChatDetails(user._id, activeItem);

  return (
    <>
      <div className="flex justify-between border-b py-2 items-center">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <Button onClick={deselectActiveItem} className="mr-5">
              <Icon icon={IoArrowBackOutline} size={20} className="md:hidden" />
            </Button>
            {activeItem.isGroupChat ? (
              <ContactGroupImage chatDetails={activeItem} />
            ) : (
              <ContactImage userImage={chatImage} />
            )}
            <Heading level={1} className="ml-2">
              {chatName}
            </Heading>
          </div>
          {!activeItem.isGroupChat && (
            <Button
              type="button"
              onClick={() => handleDeleteChat(activeItem._id)}
              className="border border-red-500 px-3 rounded-xl hover:bg-red-500 hover:text-white"
            >
              Delete
            </Button>
          )}
        </div>
        {activeItem.isGroupChat && (
          <Button type="button" onClick={() => setShowUpdateModel(true)}>
            <Icon icon={MdDriveFileRenameOutline} className="mr-4" size={20} />
          </Button>
        )}
      </div>
      {isDeleteLoading && (
        <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <Icon icon={TailSpin} width={35} height={35} color="white" />
        </div>
      )}
    </>
  );
};

export default ChatHeader;
