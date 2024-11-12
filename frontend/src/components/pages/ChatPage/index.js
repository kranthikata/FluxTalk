import React from "react";
import Sidebar from "../../organisms/Sidebar";
import ContactsSection from "../../organisms/ContactsSection";
import ChatSection from "../../organisms/ChatSection";
import ProfileSection from "../../organisms/ProfileSection";
import { SidebarProvider } from "../../../context/SidebarContext";
import { ContactsProvider } from "../../../context/ContactsContext";
import { ModelProvider } from "../../../context/ModelContext";
import { MessagesProvider } from "../../../context/MessagesContext";
import { Redirect } from "react-router-dom";

const ChatPage = () => {
  const isUserLoggedIn = JSON.parse(localStorage.getItem("userInfo"));
  if (!isUserLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <SidebarProvider>
      <MessagesProvider>
        <ContactsProvider>
          <ModelProvider>
            <div className="flex">
              <Sidebar />
              <ContactsSection />
              <ChatSection />
              <ProfileSection />
            </div>
          </ModelProvider>
        </ContactsProvider>
      </MessagesProvider>
    </SidebarProvider>
  );
};

export default ChatPage;
