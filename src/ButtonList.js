import React from "react";
import Button from "./Button";
const ButtonList = () => {
  let allButtons = [
    "All",
    "Lectures",
    "Stocks",
    "Music",
    "Poetry",
    "Mixes",
    "Gaming",
    "News",
    "Stocks",
    "T-Series",
    "Bollywood Music",
    "Dramedy",
    "JavaScript",
    "Cricket",
  ];
  let renderedButtons = allButtons.map((button) => (
    <Button key={button} className="bg-gray-200 my-1 mx-1.5 px-2 py-1 rounded">
      {button}
    </Button>
  ));
  return <div className="flex">{renderedButtons}</div>;
};

export default ButtonList;
