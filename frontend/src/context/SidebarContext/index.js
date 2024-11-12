import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  //Navigating
  const navigateTo = (path) => {
    history.replace(path);
  };

  //Toggle logout menu
  const toggleMenu = () => {
    setIsMenuOpened((prevState) => !prevState);
  };

  //Toggle side bar open/close
  const toggleSidebar = () => {
    setExpanded((prevState) => !prevState);
    setIsMenuOpened(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        isMenuOpened,
        isLoading,
        setLoading,
        toggleMenu,
        toggleSidebar,
        navigateTo,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
