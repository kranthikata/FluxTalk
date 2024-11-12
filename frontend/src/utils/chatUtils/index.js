export const getChatDetails = (loggedInUserId, chatDetails) => {
  let chatName;
  let chatImage;

  if (!chatDetails.isGroupChat) {
    const [firstUser, secondUser] = chatDetails.users;
    chatName =
      loggedInUserId === firstUser._id ? secondUser.name : firstUser.name;
    chatImage =
      loggedInUserId === firstUser._id ? secondUser.image : firstUser.image;
  } else {
    chatName = chatDetails.chatName;
  }

  return [chatName, chatImage];
};

export const getTimeStamp = (timeStamp) => {
  const date = new Date(timeStamp);
  const now = new Date();

  // Helper function to check if the date is "yesterday"
  const isYesterday = () => {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  // Check if the message was sent today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else if (isYesterday()) {
    // If it was sent yesterday
    return "Yesterday";
  } else {
    // Otherwise, show the date in DD/MM/YYYY format
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-IN", options);
  }
};

export const isSameSender = (messages, message, index, userId) => {
  return (
    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== message.sender._id ||
      messages[index + 1].sender._id === undefined) &&
    messages[index].sender._id !== userId
  );
};

export const isLastMessage = (messages, index, userId) => {
  return (
    index === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const getUserName = (loggedUser, activeItem, user) => {
  if (user._id === activeItem.groupAdmin._id && user._id === loggedUser._id) {
    return user.name + " (You) (Admin)";
  } else if (loggedUser._id === user._id) {
    return user.name + " (You)";
  } else if (user._id === activeItem.groupAdmin._id) {
    return user.name + " (Admin)";
  } else {
    return user.name;
  }
};
