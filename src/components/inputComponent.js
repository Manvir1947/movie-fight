import React, { useContext } from "react";
import { Context } from "../Context";
const InputComponent = ({ inputName }) => {
  const value = useContext(Context);
  const { inputData, setInputData, setActiveInput } = value;

  const handleInputValue = (event) => {
    setActiveInput(inputName);
    setInputData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <>
      <input
        className="main-body-inputs"
        onChange={handleInputValue}
        id={inputName}
        name={inputName}
        value={inputData[inputName]}
        placeholder="Type..."
        type="text"
      />
    </>
  );
};

export default InputComponent;
