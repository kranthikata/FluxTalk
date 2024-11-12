import React, { useContext } from "react";
import { IoIosClose } from "react-icons/io";
import Icon from "../../atoms/Icon";
import Button from "../../atoms/Button";
import ModelContext from "../../../context/ModelContext";

const ModelTemplate = ({ children }) => {
  const { setShowCreateModel, setShowUpdateModel } = useContext(ModelContext);
  const handleCloseModel = () => {
    setShowCreateModel(false);
    setShowUpdateModel(false);
  };
  return (
    <div className="z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col gap-1 text-white">
        <Button className="place-self-end" onClick={handleCloseModel}>
          <Icon icon={IoIosClose} size={30} color="black" />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default ModelTemplate;
