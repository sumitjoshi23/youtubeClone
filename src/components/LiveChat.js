import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { addMessage } from "../store/slices/chatSlice";
import { generateRandomName, generateRandomMessage } from "../utils/helper";

const LiveChat = () => {
  let dispatch = useDispatch();
  const [message, setMessage] = useState("");

  let chatMessages = useSelector((store) => store.chat.messages);
  let { profile } = useSelector((store) => store.signedInUser);
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMessage(20),
        })
      );
    }, 2000);

    return () => {
      return clearInterval(i);
    };
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addMessage({
        name: !profile ? "Anonymous user" : profile.name,
        message,
      })
    );
    console.log("dispatched");
    setMessage("");
  };

  return (
    <>
      <div className="flex flex-col-reverse overflow-y-scroll mt-4 p-2 border border-gray-500 w-full h-[585px] bg-slate-100">
        <form className="w-full flex" onSubmit={handleSubmit}>
          <input
            className="border rounded-lg border-gray-500 w-full"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="rounded text-white bg-red-700 px-2 m-2">
            Send
          </button>
        </form>
        {chatMessages.map((chatMessage, index) => (
          <ChatMessage
            key={index}
            name={chatMessage.name}
            message={chatMessage.message}
          />
        ))}
      </div>
    </>
  );
};

export default LiveChat;
