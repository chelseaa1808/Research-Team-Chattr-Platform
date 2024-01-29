
import ConversationTable from "../components/ConversationTable";
import { useGetConversationsQuery } from "../store/apis/chatApi";
import { useParams } from "react-router-dom";
const ConversationPage = () => {
  const {name} = useParams();
  const {data} = useGetConversationsQuery(name, { skip: !name });
  const headers = [
    {key: "uuid", name: "UUID"},
    {key: "created", name: "Created At"}
  ]

  return (
    <ConversationTable headers={headers} tableData={data}/>
  );
};

export default ConversationPage