import React from "react";
import Image from "../../atoms/Image";
import Heading from "../../atoms/Heading";
import Button from "../../atoms/Button";

const PageNotFound = ({ history }) => {
  const backToHome = () => {
    history.replace("/");
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-700 to-slate-500">
      <Image
        src="https://res.cloudinary.com/duqopzabn/image/upload/v1731051318/ChatApplication/rb_13616_fl6ezb.png"
        alt="Page Not Found"
        className="w-1/2 mb-3"
      />
      <Heading level={1} className="text-2xl text-white mb-3">
        Oops! The page you’re looking for doesn’t exist.
      </Heading>
      <Button
        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
        onClick={backToHome}
      >
        Back To Home
      </Button>
    </div>
  );
};

export default PageNotFound;
