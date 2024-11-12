import React from "react";
import Heading from "../../atoms/Heading";
import ModelTemplate from "../../templates/ModelTemplate";
import AddGroupChatModelForm from "../../molecules/AddGroupChatModelForm";

const AddGroupChatModel = () => {
  return (
    <ModelTemplate>
      <div className="bg-green-950 rounded-xl px-5 py-10 flex flex-col gap-5 items-center mx-4">
        <Heading level={1} className="text-xl md:text-3xl font-extrabold">
          Create Group Chat
        </Heading>
        <AddGroupChatModelForm />
      </div>
    </ModelTemplate>
  );
};

export default AddGroupChatModel;
