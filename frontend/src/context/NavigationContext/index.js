import { createContext } from "react";
import { useHistory } from "react-router-dom";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const history = useHistory();
  const navigateTo = (path) => {
    history.push(path);
  };
  const navigateReplace = (path) => {
    history.replace(path);
  };
  return (
    <NavigationContext.Provider value={{ navigateTo, navigateReplace }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;
