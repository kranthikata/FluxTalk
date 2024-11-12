import React, { useContext } from "react";
import ContactsHeader from "../../molecules/ContactsHeader";
import ContactsList from "../../molecules/ContactsList";
import ContactsContext from "../../../context/ContactsContext";
import ModelContext from "../../../context/ModelContext";
import Icon from "../../atoms/Icon";
import { TailSpin } from "react-loader-spinner";
import AddGroupChatModel from "../../organisms/AddGroupChatModel";
import Paragraph from "../../atoms/Paragraph";

const ContactsSection = () => {
  const { contacts, isLoading, activeItem, updateActiveItem } =
    useContext(ContactsContext); // Using the context of contacts
  const { setShowCreateModel, showCreateModel } = useContext(ModelContext);
  const renderLoading = () => (
    <div className="w-full h-screen flex justify-center items-center">
      <Icon icon={TailSpin} width={35} height={35} />
    </div>
  );

  const renderContacts = () => (
    <ContactsList
      contacts={contacts}
      activeItem={activeItem}
      toggleActiveItem={updateActiveItem}
    />
  );

  const renderNoContacts = () => (
    <div className="w-full h-screen flex justify-center items-center">
      <Paragraph className="text-black text-lg">
        No Contacts Available
      </Paragraph>
    </div>
  );

  const renderCurrentView = (contacts, isLoading) => {
    switch (true) {
      case isLoading:
        return renderLoading();
      case contacts.length === 0:
        return renderNoContacts();
      default:
        return renderContacts();
    }
  };
  return (
    <>
      <div
        className={`w-[calc(100vw_-_4rem)] p-4 fixed left-16 md:w-64 border-r ${
          activeItem && "hidden md:block"
        }`}
      >
        <ContactsHeader
          toggleModel={() => setShowCreateModel((prevState) => !prevState)}
        />
        {renderCurrentView(contacts, isLoading)}
      </div>
      {showCreateModel && <AddGroupChatModel />}
    </>
  );
};

export default ContactsSection;
