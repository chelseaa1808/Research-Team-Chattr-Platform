import { useGetBotsQuery } from "../store/apis/chatApi";
import BotTable from "../components/BotTable";

const BotPage = () => {
    const {data} = useGetBotsQuery(); 
    const headers = [
        {key: "display_name", name: "Display Name"},
        {key: "model", name: "Model" },
        {key: "bot_initiates", name: "Bot Initiates?"},
        {key: "system_message", name: "System Message"},
    ]
    return (
        <>
            <BotTable headers={headers} tableData={data} />
        </>
    )
};

export default BotPage