import ChatHistory from "../components/ChatHistory";
import { useEffect } from "react";
import ChatForm from "../components/ChatForm";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateConversationMutation } from "../store";

const ChatPage = () => {
  const { slug, uuid } = useParams();
  const navigate = useNavigate();
  const [createConversation, result] = useCreateConversationMutation();

  useEffect(() => {
    // Only create a new conversation if the slug is present and the uuid is not
    if (slug && !uuid) {
      createConversation(slug).then(({ data }) => {
        navigate(`/chat/${slug}/${data.uuid}`);
      });
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="max-w-xl border rounded center">
        <div className="w-full">
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
