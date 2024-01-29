import Table from "./Table"
import {useNavigate, useLocation} from "react-router-dom"

const BotTable = ({headers, tableData}) => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const conversationsRedirect = (rowData) =>{
    navigate(`${pathname.pathname}/${rowData.name}`)
  }

  return (
    <>
      <Table headers={headers} tableData={tableData} onRowClick={conversationsRedirect} />
    </>
  )
}

export default BotTable