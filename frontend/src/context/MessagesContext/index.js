import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { getMessages, sendMessage } from "../../api/messagesAPI";
import { toast } from "react-toastify";

const socket = io("https://fluxtalk.onrender.com", {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [chatId, setChatId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messagesLoadingStatus, setMessagesLoadingStatus] = useState("INITIAL");

  const keepAliveInterval = 30000;

  setInterval(() => {
    socket.emit("ping");
  }, keepAliveInterval);

  socket.on("pong", () => {
    console.log("Server is alive");
  });

  useEffect(() => {
    if (!chatId) return;

    //Join the chat room when chatId changes
    socket.emit("join", chatId);

    //Fetch initial messages
    const fetchMessages = async () => {
      try {
        setMessagesLoadingStatus("LOADING");
        const { data } = await getMessages(chatId);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [chatId]: data,
        }));
        setMessagesLoadingStatus("DONE");
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (chatId) {
      fetchMessages();
    }

    //Clean up the socket listener
    return () => {
      socket.off("chat message");
      setMessagesLoadingStatus("INITIAL");
    };
  }, [chatId]);

  //Listen for new messages
  useEffect(() => {
    const handleIncomingMessage = (msg) => {
      if (msg.room === chatId) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [chatId]: [...(prevMessages[chatId] || []), msg],
        }));
      }
    };

    socket.on("chat message", handleIncomingMessage);

    // Clean up the message listener on unmount
    return () => {
      socket.off("chat message", handleIncomingMessage);
    };
  }, [chatId]);

  const handleSendMessage = async (newMessage, activeItemId) => {
    if (newMessage) {
      try {
        setNewMessage("");
        const { data } = await sendMessage(newMessage, activeItemId);
        socket.emit("chat message", { ...data, room: activeItemId });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const activeChatMessages = messages[chatId] || [];

  return (
    <MessagesContext.Provider
      value={{
        activeChatMessages,
        newMessage,
        messagesLoadingStatus,
        setNewMessage,
        setChatId,
        handleSendMessage,
        setMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
