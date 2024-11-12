// hooks/useMessages.js
import { useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const useMessages = (chatId, setMessages) => {
  const fetchMessages = async (accessToken) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/messages/${chatId}`,
        config
      );
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    if (chatId) {
      socket.emit("join", chatId);
      socket.on("chat message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      // Clean up the listener when the component unmounts or chatId changes
      return () => socket.off("chat message");
    }
  }, [chatId, setMessages]);

  return { fetchMessages };
};

export default useMessages;
