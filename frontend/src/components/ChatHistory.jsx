import ChatMessage from "./ChatMessage";
import { useGetMessagesQuery } from "../store";

const ChatHistory = ({ slug, uuid }) => {
  const { data, isLoading, isError } = useGetMessagesQuery(uuid);

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
        <span className="block ml-2 font-bold text-gray-600">
          Bot Name Placeholder
        </span>
        {/* Online green dot */}
        <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
      </div>
      {/* Messages list */}
      <div
        id="chatBox"
        className="space-y-4 relative w-full p-6 overflow-y-auto scroll-smooth h-[30rem]"
      >
        {content}
      </div>
    </>
  );
};

export default ChatHistory;
