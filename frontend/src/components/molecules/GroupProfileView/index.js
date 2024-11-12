import React, { useContext } from "react";
import GroupProfileViewItem from "../GroupProfileViewItem";
import ContactsContext from "../../../context/ContactsContext";

const GroupProfileView = () => {
  const { activeItem } = useContext(ContactsContext);
  return (
    <ul className="h-[90vh] overflow-y-auto custom-scrollbar">
      {activeItem?.users.map((eachUser) => (
        <GroupProfileViewItem
          key={eachUser._id}
          currentUser={eachUser}
          activeItem={activeItem}
        />
      ))}
    </ul>
  );
};

export default GroupProfileView;
