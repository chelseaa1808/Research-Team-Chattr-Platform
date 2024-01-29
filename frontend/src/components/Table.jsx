import TableBody from "./TableBody"
import TableHead from "./TableHead"

const Table = ({headers, tableData, onRowClick}) => {
  return(
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <TableHead headers={headers}/>
      <TableBody headers={headers} tableData={tableData} onRowClick={onRowClick}/>
    </table>
  )

}

Table.defaultProps = {
  headers: [],
  tableData: []
}

export default Table