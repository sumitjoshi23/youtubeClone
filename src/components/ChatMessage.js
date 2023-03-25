import React from "react";
import { FaUserAlt } from "react-icons/fa";
const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center p-2 shadow-sm">
      <FaUserAlt className="h-8 mr-2" />
      <span className="text-gray-500 font-bold px-2 ">{name}</span>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;
