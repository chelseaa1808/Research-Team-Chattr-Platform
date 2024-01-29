import TableRow from "./TableRow"

const TableBody = ({headers, tableData, onRowClick}) => {

  //construct table rows from tableData
  const tableRows = tableData.map((rowData) => {
    return (
      <TableRow key={rowData.name} headers={headers} rowData={rowData} onRowClick={onRowClick}/>
    )
  })

  return (
    <tbody>
      {tableRows}
    </tbody>
  )
}

export default TableBody