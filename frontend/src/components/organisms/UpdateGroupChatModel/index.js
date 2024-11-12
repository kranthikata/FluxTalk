import React, { useContext } from "react";
import ModelTemplate from "../../templates/ModelTemplate";
import Heading from "../../atoms/Heading";
import ModelContext from "../../../context/ModelContext";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { IoIosClose } from "react-icons/io";
import EditGroupChatModelForm from "../../molecules/EditGroupChatModelForm";
import { TailSpin } from "react-loader-spinner";

const UpdateGroupChatModel = () => {
  const { currentUsers, handleRemove, isUpdateLoading } =
    useContext(ModelContext);

  return (
    <ModelTemplate>
      <div className="bg-cyan-900 rounded-xl px-5 py-5 flex flex-col gap-5 items-center mx-4 shadow-2xl">
        <Heading level={1} className="text-xl md:text-3xl font-extrabold">
          Update Group
        </Heading>
        <Heading level={2} className="text-lg">
          Group Members
        </Heading>
        <ul className="flex max-w-96 flex-wrap justify-center">
          {currentUsers.map((eachUser) => (
            <li
              key={eachUser._id}
              className="flex items-center bg-gradient-to-tl from-customGreen to-customBlue p-1 rounded-full mr-2 mb-1"
            >
              <span>{eachUser.name}</span>
              <Button type="button" onClick={() => handleRemove(eachUser)}>
                <Icon icon={IoIosClose} size={25} />
              </Button>
            </li>
          ))}
        </ul>
        <EditGroupChatModelForm />
      </div>
      {isUpdateLoading && (
        <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <Icon icon={TailSpin} width={35} height={35} color="black" />
        </div>
      )}
    </ModelTemplate>
  );
};

export default UpdateGroupChatModel;
