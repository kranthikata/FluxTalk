import React from "react";
import ContactItem from "../ContactItem";

const ContactsList = ({ contacts, activeItem, toggleActiveItem }) => {
  return (
    <ul className="overflow-y-auto flex flex-col custom-scrollbar h-[90vh]">
      {contacts.map((eachChat) => (
        <ContactItem
          key={eachChat._id}
          chatDetails={eachChat}
          isActive={activeItem?._id === eachChat._id}
          onSelectItem={() => toggleActiveItem(eachChat)}
        />
      ))}
    </ul>
  );
};

export default ContactsList;
