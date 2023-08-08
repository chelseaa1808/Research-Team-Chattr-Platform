import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSendMessageMutation } from "../store";
import { useGetMessagesQuery } from "../store";

export default function ChatForm({ uuid }) {
  const [message, setMessage] = useState("");
  const [sendMessage, result] = useSendMessageMutation({fixedCacheKey: "message-sending"});
  const { data: messages, updateQueryData } = useGetMessagesQuery();

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage({
      uuid: uuid,
      text: message,
    });
    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
          <input
            placeholder="Type your message"
            type="text"
            value={message}
            onChange={handleChange}
            className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-lg outline-none focus:text-gray-700"
          />
          <button
            className="flex items-center px-3 py-2 mx-2 rounded-md bg-lime-200"
            type="submit"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-500 origin-center" />
          </button>
        </div>
      </form>
    </div>
  );
}
