import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useGetConversationQuery, useGetMessagesQuery } from "../store";

const ChatHistory = ({ slug, uuid }) => {
  const { data, isLoading, isError } = useGetMessagesQuery(uuid);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const {
    data: conversation,
    isLoading: conversationLoading,
    isError: conversationError,
  } = useGetConversationQuery(uuid);
  let botName = "Bot Name";
  if (conversation) {
    botName = conversation.chat_page.bot.display_name;
  }

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>Error!</div>;
  } else {
    content = data.map((message) => (
      <ChatMessage
        key={message.id}
        actor={message.actor}
        text={message.text}
        timestamp={message.timestamp}
      />
    ));
  }

  return (
    <>
      {/* Chat header */}
      <div className="relative flex items-center p-3 border-b border-gray-300">
        <img
          src="https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"
          alt=""
          className="object-cover w-10 h-10 rounded-full"
        />
        <span className="block ml-2 font-bold text-gray-600">{botName}</span>
        {/* Online green dot */}
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      </div>
      {/* Messages list */}
      <div className="space-y-4 relative w-full p-6 overflow-y-auto scroll-smooth h-[30rem]">
        {content}
        <div className="float-left clear-both" ref={messagesEndRef}></div>
      </div>
    </>
  );
};

export default ChatHistory;
