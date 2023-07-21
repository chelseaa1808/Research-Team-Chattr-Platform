import React from "react";

const ChatWindow = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start">
            <div className="p-2 bg-gray-200 rounded-lg">
              <p className="text-gray-800">Hi there!</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">10:00 AM</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="p-2 bg-blue-500 rounded-lg">
              <p className="text-white">Hey!</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">10:01 AM</p>
          </div>
          <div className="flex flex-col items-start">
            <div className="p-2 bg-gray-200 rounded-lg">
              <p className="text-gray-800">How are you?</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">10:02 AM</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="p-2 bg-blue-500 rounded-lg">
              <p className="text-white">I'm good, thanks!</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">10:03 AM</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <form className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border-gray-300 rounded-lg"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
