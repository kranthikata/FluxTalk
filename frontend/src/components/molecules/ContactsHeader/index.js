import React from "react";
import PropTypes from "prop-types";
import Heading from "../../atoms/Heading";
import { GrGroup } from "react-icons/gr";
import Icon from "../../atoms/Icon";
import Button from "../../atoms/Button";

const ContactsHeader = ({ toggleModel }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading level={1} className="text-slate-800 font-bold text-xl">
          Chats
        </Heading>
        <Button
          onClick={toggleModel}
          type="button"
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <Icon size={20} icon={GrGroup} />
        </Button>
      </div>
      <hr className="mb-2" />
    </>
  );
};

ContactsHeader.propTypes = {
  toggleModel: PropTypes.func.isRequired,
};

export default ContactsHeader;
