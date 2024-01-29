import ChatHistory from "../components/ChatHistory";
import { useParams } from "react-router-dom";


const BotPage = () => {
    const {uuid} = useParams(); 
    
    return (
        <div className="container mx-auto">
            <div className="max-w-xl border rounded center">
                <div className="w-full">
                    <ChatHistory uuid={uuid} />
                </div>
            </div>
        </div>
    )
};

export default BotPage