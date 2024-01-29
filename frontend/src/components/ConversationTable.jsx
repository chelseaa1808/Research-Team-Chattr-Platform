import Table from "./Table"
import {useNavigate, useLocation} from "react-router-dom"

const ConversationTable = ({headers, tableData}) => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const chatHistoryRedirect = (rowData) => {
    navigate(`${pathname.pathname}/${rowData.uuid}`)
  }
  
  return (
    <Table headers={headers} tableData={tableData} onRowClick={chatHistoryRedirect}/>
  )

}

export default ConversationTable