import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import ChatPage from "./components/pages/ChatPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/molecules/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/registration" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/chat" component={ChatPage} />
        <Route exact path="/not-found" component={PageNotFound} />
        <Redirect to="/not-found" />
      </Switch>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
