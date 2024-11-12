import React, { useState, useRef, useEffect, useContext } from "react";
import Input from "../../atoms/Input";
import { createGroupChat } from "../../../api/chatAPI";
import { searchUsers } from "../../../api/userSearchAPI";
import Image from "../../atoms/Image";
import Paragraph from "../../atoms/Paragraph";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { IoIosClose } from "react-icons/io";
import ContactsContext from "../../../context/ContactsContext";
import { TailSpin } from "react-loader-spinner";
import ModelContext from "../../../context/ModelContext";
import { toast } from "react-toastify";

const AddGroupChatModelForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    userName: "",
  });
  const [searchResults, setSearchResults] = useState({
    results: [],
    status: "",
  });
  const [userTags, setUserTags] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { handleContactUpdate, updateActiveItem } = useContext(ContactsContext);
  const { setShowCreateModel } = useContext(ModelContext);
  let userIds = useRef([]);

  useEffect(() => {
    return () => {
      userIds.current = [];
    };
  }, []);

  //Function to handle the group creation
  const onHandleSubmit = async (event) => {
    event.preventDefault();
    //create group chat
    if (formData.groupName.trim() === "") {
      toast.error("Enter valid group name");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const { data } = await createGroupChat(
        formData.groupName,
        userIds.current
      );
      await handleContactUpdate();
      updateActiveItem(data.groupChat);
      setShowCreateModel(false);
      toast.success("Group Created Successfully!");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "An unknown error occurred"
      );
      toast.error("Group creation failed");
    } finally {
      setLoading(false);
    }
  };

  //Perform search
  const searchUser = async (userName) => {
    if (userName === "") return;
    try {
      setError("");
      const { data } = await searchUsers(userName);
      setSearchResults((prevState) => ({ ...prevState, results: data }));
    } catch (error) {
      setError(
        error.response.data.message ||
          error.message ||
          "An unknown error occurred"
      );
    } finally {
      setSearchResults((prevState) => ({ ...prevState, status: "DONE" }));
    }
  };

  useEffect(() => {
    let delayDebounce;
    if (formData.userName.trim() === "") {
      clearTimeout(delayDebounce);
      setSearchResults({ status: "", results: [] });
      return;
    }

    setSearchResults((prevState) => ({ ...prevState, status: "LOADING" }));
    delayDebounce = setTimeout(() => {
      searchUser(formData.userName);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [formData.userName]);

  //Handle username input change
  const onChangeUserName = async (event) => {
    setFormData((prevState) => ({
      ...prevState,
      userName: event.target.value,
    }));
  };

  //Handle select user
  const handleSelectUser = (user) => {
    setFormData((prevState) => ({
      ...prevState,
      userName: "",
    }));
    if (!userTags.includes(user.name)) {
      setUserTags([...userTags, user.name]);
      userIds.current.push(user);
    }
  };

  //Handle remove user
  const handleDeleteUserTag = (tagIndex) => {
    const newUserTags = userTags.filter((eachTag, index) => index !== tagIndex);
    setUserTags(newUserTags);
  };

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <Input
          type="text"
          name="group name"
          placeholder="Enter Group Name"
          value={formData.groupName}
          onChange={(event) =>
            setFormData((prevState) => ({
              ...prevState,
              groupName: event.target.value,
            }))
          }
          className="w-full px-4 py-3 text-black border-gray-300 rounded-md mb-2"
        />
        <Input
          type="search"
          name="search"
          placeholder="Add Users"
          value={formData.userName}
          onChange={onChangeUserName}
          className="w-full px-4 py-3 text-black border-gray-300 rounded-md mb-2 outline-none"
        />
        {searchResults.status === "LOADING" && (
          <div className="w-full h-28 flex items-center justify-center m-auto rounded-md z-10 mt-2">
            <Icon
              icon={TailSpin}
              height={20}
              color="white"
              ariaLabel="loading"
            />
          </div>
        )}
        {searchResults.results.length === 0 &&
          searchResults.status === "DONE" && (
            <div className="w-full h-28 flex flex-col items-center justify-center m-auto rounded-md z-10 mt-2 bg-white">
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
            className={`w-full h-28 overflow-y-auto pl-0 flex flex-col m-auto rounded-md z-10 mt-2 custom-scrollbar ${
              searchResults.status === "LOADING" && "hidden"
            }`}
          >
            {searchResults.results.map((eachUser) => (
              <li
                key={eachUser._id}
                onClick={() => handleSelectUser(eachUser)}
                className="px-2 rounded-md py-1 flex items-center mb-1 cursor-pointer hover:bg-gradient-to-r from-customBlue to-customGreen"
              >
                <Image
                  src={eachUser.image}
                  className="h-10 w-10 rounded-full"
                  alt="user profile"
                />
                <Paragraph className="ml-2">{eachUser.name}</Paragraph>
              </li>
            ))}
          </ul>
        )}
        <div className="flex mt-1">
          {userTags.map((eachTag, index) => (
            <div className="flex mr-2" key={index}>
              <span className="text-sm items-center flex bg-gradient-to-bl from-customBlue to-customGreen px-2 rounded-full">
                {eachTag}
              </span>
              <Button type="button" onClick={() => handleDeleteUserTag(index)}>
                <Icon icon={IoIosClose} size={25} />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="submit"
          className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-customGreen hover:shadow-2xl hover:scale-105 duration-300"
        >
          Create
        </Button>
      </form>
      {error && (
        <Paragraph className="text-red-500 text-xs text-center font-bold mt-3 animate-shake">
          {error}
        </Paragraph>
      )}

      {isLoading && (
        <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <Icon icon={TailSpin} width={35} height={35} color="white" />
        </div>
      )}
    </>
  );
};

export default AddGroupChatModelForm;
