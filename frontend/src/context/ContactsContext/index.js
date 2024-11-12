import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { getContacts } from "../../api/contactsAPI";
import { deleteChat } from "../../api/chatAPI";
import MessagesContext from "../MessagesContext";
import { toast } from "react-toastify";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setChatId, setMessages } = useContext(MessagesContext);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactUpdate = async () => {
    await fetchContacts();
  };

  const updateActiveItem = (item) => {
    setActiveItem(item);
    if (item) {
      setChatId(item._id);
      setMessages([item._id]);
    }
  };

  const deselectActiveItem = async () => {
    setActiveItem(null);
    setChatId(null);
    await handleContactUpdate();
  };

  const handleDeleteChat = async (chatId) => {
    try {
      setIsDeleteLoading(true);
      await deleteChat(chatId);
      setActiveItem(null);
      setMessages((prevState) => {
        const updatedMessages = { ...prevState };
        delete updatedMessages[chatId];
        return updatedMessages;
      });
      await handleContactUpdate();
      toast.success("Chat Deleted Successfully");
    } catch (error) {
      toast.error("Chat Deletion failed!");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isLoading,
        activeItem,
        isDeleteLoading,
        setActiveItem,
        updateActiveItem,
        deselectActiveItem,
        handleDeleteChat,
        handleContactUpdate,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

ContactsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContactsContext;
