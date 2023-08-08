import ChatHistory from "../components/ChatHistory";
import { useState, useEffect } from "react";
import ChatForm from "../components/ChatForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateConversationMutation,
  useGetConversationQuery,
} from "../store";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const ChatPage = () => {
  const { slug, uuid } = useParams();
  const navigate = useNavigate();
  const [createConversation, result] = useCreateConversationMutation();
  const { data: conversation } = useGetConversationQuery(uuid, { skip: !uuid });
  const [showBanner, setShowBanner] = useState(false);

  const disclaimerText = conversation?.chat_page.disclaimer;

  // Page load, create a new conversation if the slug is present
  useEffect(() => {
    // Only create a new conversation if the slug is present and the uuid is not
    if (slug && !uuid) {
      createConversation(slug).then(({ data }) => {
        navigate(`/chat/${slug}/${data.uuid}`);
      });
    }
  }, []);

  // Show the disclaimer banner if the disclaimer text is present
  useEffect(() => {
    if (disclaimerText) {
      setShowBanner(true);
    }
  }, [disclaimerText]);

  const handleBannerClose = () => {
    setShowBanner(false);
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-xl border rounded center">
        <div className="w-full">
          {showBanner && (
            <div className="flex items-center justify-between p-2 text-white bg-rose-500">
              <span className="text-sm">
                <ExclamationTriangleIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
                {disclaimerText}
              </span>
              <button onClick={handleBannerClose}>
                <XMarkIcon className="inline-block w-4 h-4 mr-1" />
              </button>
            </div>
          )}

          <ChatHistory slug={slug} uuid={uuid} />
        </div>
        <div className="w-full">
          <ChatForm uuid={uuid} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
