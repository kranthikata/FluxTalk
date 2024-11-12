import React, { useContext, useState, useEffect } from "react";
import Input from "../../atoms/Input";
import Image from "../../atoms/Image";
import Paragraph from "../../atoms/Paragraph";
import Button from "../../atoms/Button";
import Icon from "../../atoms/Icon";
import { IoIosClose } from "react-icons/io";
import ContactsContext from "../../../context/ContactsContext";
import ModelContext from "../../../context/ModelContext";
import { addUserToGroup, renameGroup } from "../../../api/chatAPI";
import { searchUsers } from "../../../api/userSearchAPI";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

const EditGroupChatModelForm = () => {
  const { activeItem, handleContactUpdate, updateActiveItem } =
    useContext(ContactsContext);
  const {
    error,
    setError,
    setShowUpdateModel,
    handleRemove,
    setIsUpdateLoading,
  } = useContext(ModelContext);

  const [formData, setFormData] = useState({
    groupName: "",
    userName: "",
  });
  const [searchResults, setSearchResults] = useState({
    results: [],
    status: "",
  });
  const [userTags, setUserTags] = useState([]);

  //Perform search
  const searchUser = async (userName) => {
    if (userName === "") return;
    try {
      const { data } = await searchUsers(userName);
      setSearchResults((prevState) => ({ ...prevState, results: data }));
    } catch (error) {
      console.log(error);
    } finally {
      setSearchResults((prevState) => ({ ...prevState, status: "DONE" }));
    }
  };

  useEffect(() => {
    let delayDebounce;
    if (formData.userName === "") {
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

  //Handle change username
  const handleChangeUserName = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      userName: event.target.value,
    }));
  };

  //Handle add new user
  const handleAddUser = async (selectedUser) => {
    setError("");
    const { user } = JSON.parse(localStorage.getItem("userInfo"));
    //Checking does user already exists
    if (
      activeItem.users.find((eachUser) => eachUser._id === selectedUser._id)
    ) {
      setError("User Already Exists");
      return;
    }

    //Checking loggedIn user is not group admin
    if (activeItem.groupAdmin._id !== user._id) {
      setError("Only admin can add new members");
      return;
    }

    try {
      setError("");
      setIsUpdateLoading(true);
      const { data } = await addUserToGroup(activeItem._id, selectedUser._id);
      updateActiveItem(data.addedMember);
      setShowUpdateModel(false);
      toast.success(`Welcome! ${selectedUser.name} has joined the group.`);
      await handleContactUpdate();
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      toast.error("Unexpected error occured!");
    } finally {
      setIsUpdateLoading(false);
    }
  };

  //Handle delete user tag that is added newly
  const handleDeleteUserTag = (tagIndex) => {
    const newTagsList = userTags.filter((eachTag, index) => index !== tagIndex);
    setUserTags(newTagsList);
  };

  //Handle rename
  const handleRename = async () => {
    //Check group name is empty
    if (!formData.groupName.trim()) {
      setError("Enter Group name to update");
      toast.info("Enter group name");
      return;
    }

    //Perfom rename
    try {
      setError("");
      setIsUpdateLoading(true);
      const { data } = await renameGroup(activeItem._id, formData.groupName);
      setShowUpdateModel(false);
      updateActiveItem(data.updatedChatName);
      toast.success("Chat Name Updated Successfully!");
      await handleContactUpdate();
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      toast.error("Error occured while updating.");
    } finally {
      setIsUpdateLoading(false);
    }

    setFormData((prevState) => ({ ...prevState, groupName: "" }));
  };

  return (
    <form>
      <Input
        type="text"
        name="remane group"
        placeholder="Rename Group"
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
        placeholder="Add User"
        value={formData.userName}
        onChange={handleChangeUserName}
        className="w-full px-4 py-3 text-black border-gray-300 rounded-md outline-none"
      />
      {searchResults.status === "LOADING" && (
        <div className="w-full h-28 flex items-center justify-center m-auto rounded-md z-10 mt-2">
          <Icon icon={TailSpin} height={20} color="white" />
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
              onClick={() => handleAddUser(eachUser)}
              className="px-2 rounded-md py-1 flex items-center mb-1 cursor-pointer hover:bg-gradient-to-r from-customGreen to-customBlue"
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
          <div className="flex mr-2">
            <span className="text-sm items-center flex bg-gradient-to-bl from-custom-blue-1 to-custom-green-1 px-2 rounded-full">
              {eachTag}
            </span>
            <Button type="button" onClick={() => handleDeleteUserTag(index)}>
              <Icon icon={IoIosClose} size={25} />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            const { user } = JSON.parse(localStorage.getItem("userInfo"));
            handleRemove(user);
          }}
          className="mt-4 w-[49%] flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-gradient-to-t from-red-500 to-red-400 hover:bg-gradient-to-b shadow-xl hover:scale-105 duration-300"
        >
          Leave Group
        </button>

        <button
          type="button"
          onClick={handleRename}
          className="mt-4 w-[49%] flex items-center justify-center gap-2 px-5 py-3 font-medium rounded-md bg-gradient-to-t from-customGreen to-green-400 hover:bg-gradient-to-b hover:scale-105 duration-300 shadow-xl"
        >
          Update
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs text-center font-bold mt-3 animate-shake">
          {error}
        </p>
      )}
    </form>
  );
};

export default EditGroupChatModelForm;
