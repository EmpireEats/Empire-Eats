import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../redux/actions/yerrrChatActions";

const YerrrChat = () => {
  const messages = useSelector((state) => state.yerrrChat.messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
        console.log("sending message...", currentMessage);
      dispatch(sendMessage({ text: currentMessage }));
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default YerrrChat;

