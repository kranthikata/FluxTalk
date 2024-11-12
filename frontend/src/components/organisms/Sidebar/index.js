import React, { useContext, useState, useRef, useEffect } from "react";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import SidebarContext from "../../../context/SidebarContext";
import SidebarHeader from "../../molecules/SidebarHeader";
import SidebarNavigation from "../../molecules/SidebarNavigation";
import SidebarUserProfile from "../../molecules/SidebarUserProfile";
import { searchUsers } from "../../../api/userSearchAPI";
import SearchResultItem from "../../molecules/SearchResultItem";
import { createChat } from "../../../api/chatAPI";
import ContactsContext from "../../../context/ContactsContext";
import Icon from "../../atoms/Icon";
import Input from "../../atoms/Input";
import { IoSearchSharp } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import Button from "../../atoms/Button";
import Image from "../../atoms/Image";
import { toast } from "react-toastify";

const navItems = [
  {
    id: 0,
    icon: HiOutlineChatBubbleBottomCenterText,
    text: "Chats",
    active: true,
  },
];
const Sidebar = () => {
  const { updateActiveItem, handleContactUpdate } = useContext(ContactsContext);
  const {
    expanded,
    navigateTo,
    isLoading,
    isMenuOpened,
    setLoading,
    toggleMenu,
    toggleSidebar,
  } = useContext(SidebarContext); //Utilizing the sidebarContext
  const { user } = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState({
    results: [],
    status: "",
  });

  useEffect(() => {
    //Function for the detecting the click outside the sidebar
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        expanded
      ) {
        toggleSidebar();
      }
    };

    //Adding the event listener
    document.addEventListener("mousedown", handleClickOutside);

    //Clean up funcion
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded, toggleSidebar]);

  useEffect(() => {
    let delayDebounce;
    if (searchInputValue === "") {
      clearTimeout(delayDebounce);
      setSearchResults({ status: "", results: [] });
      return;
    }

    setSearchResults((prevState) => ({ ...prevState, status: "LOADING" }));
    delayDebounce = setTimeout(() => {
      searchUser(searchInputValue);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchInputValue]);

  //Creating the reference to the Sidebar
  const sidebarRef = useRef();

  //Function to perform the search
  const searchUser = async (username) => {
    if (username === "") return;
    try {
      const { data } = await searchUsers(username);
      setSearchResults((prevState) => ({ ...prevState, results: data }));
    } catch (error) {
      console.log(error);
    } finally {
      setSearchResults((prevState) => ({ ...prevState, status: "DONE" }));
    }
  };

  //Handling the user search input
  const handleSearchInput = (event) => {
    setSearchInputValue(event.target.value);
  };

  //Create a chat with the selected user from search results
  const createChatWithUser = async (userId) => {
    try {
      setLoading(true);
      const { data } = await createChat(userId);
      await handleContactUpdate();
      updateActiveItem(data.chat);
      toggleSidebar();
      setSearchInputValue("");
      setSearchResults((prevState) => ({ ...prevState, usersList: [] }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //Handling the logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigateTo("/");
    toast.success("Logout successful!");
  };

  //Opening the search bar
  const openSearchBar = () => {
    if (!expanded) {
      toggleSidebar();
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`h-screen z-10 ${expanded ? "w-60" : "w-16"}`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <SidebarHeader />

        <div
          className={`${
            expanded
              ? "w-[85%]"
              : "w-9 justify-center bg-gray-50 hover:bg-gray-100"
          } flex relative border items-center m-auto h-9 rounded-md my-2`}
        >
          <Input
            type="search"
            name="search"
            placeholder="Search User.."
            className={`w-[90%] h-full p-2 rounded-md outline-none text-md text-gray-600 ${
              !expanded && "hidden"
            }`}
            onChange={handleSearchInput}
            value={searchInputValue}
          />
          <Button type="button" onClick={openSearchBar}>
            <Icon icon={IoSearchSharp} color="#99a2b0" />
          </Button>
        </div>
        {searchResults.status === "LOADING" && (
          <div
            className={`w-full h-28 flex items-center justify-center m-auto rounded-md z-10 mt-2 ${
              !expanded && "hidden"
            }`}
          >
            <Icon icon={TailSpin} height={20} color="black" />
          </div>
        )}
        {searchResults.results.length === 0 &&
          searchResults.status === "DONE" && (
            <div
              className={`w-full h-28 flex flex-col items-center justify-center m-auto rounded-md z-10 mt-2 bg-white ${
                !expanded && "hidden"
              }`}
            >
              <Image
                src="https://res.cloudinary.com/duqopzabn/image/upload/v1731051318/ChatApplication/rb_13616_fl6ezb.png"
                alt="Not Found"
                className="h-20"
              />
              <p className="text-black">User Not Found</p>
            </div>
          )}
        {searchResults.results.length !== 0 && (
          <ul
            className={`w-[85%] pl-0 max-h-32 overflow-auto custom-scrollbar flex flex-col m-auto rounded-md ${
              !expanded && "hidden"
            } ${searchResults.status === "LOADING" && "hidden"} z-10`}
          >
            {searchResults.results.map((eachUser) => (
              <SearchResultItem
                key={eachUser._id}
                id={eachUser._id}
                username={eachUser.name}
                image={eachUser.image}
                createChatWithUser={createChatWithUser}
              />
            ))}
          </ul>
        )}
        <SidebarNavigation items={navItems} />
        <SidebarUserProfile
          user={user}
          onLogout={handleLogout}
          onClick={toggleMenu}
          isMenuOpened={isMenuOpened}
        />
      </nav>
      {isLoading && (
        <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center h-full w-full">
          <Icon
            icon={TailSpin}
            height={30}
            width={30}
            color="black"
            className="absolute top-1/2 right-0 -translate-y-1/2"
          />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
