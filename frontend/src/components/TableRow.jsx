// import checkIcon from "../assets/circle-check-icon.svg"
import CircleXIcon from "./CircleXIcon"
import CircleCheckIcon from "./CircleCheckIcon"
const TableRow = ({headers, rowData, onRowClick}) => {

  const tdList = headers.map((header) => {
    let data

    if (typeof rowData[header.key] === "boolean") {
      data = rowData[header.key] ? <CircleCheckIcon/> : <CircleXIcon/>
    } else if (new Date(rowData[header.key]).toString() !== "Invalid Date") {
      data = new Date(rowData[header.key]).toLocaleString()
    } else {
      data = rowData[header.key]
    }

    return (
      <td key={header.key} scope="row" className="px-6 py-4">
        {data}
      </td>
    )
  })

  return (
    <tr onClick={() => onRowClick(rowData)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    {/* //   <td className="w-4 p-4">
    //       <div className="flex items-center">
    //           <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    //           <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
    //       </div>
    //   </td> */}
      {tdList}
    </tr>
  )
}

export default TableRow