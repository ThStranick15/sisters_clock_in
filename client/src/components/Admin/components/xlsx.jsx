import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'
import { GET_ALL_USERS } from "../../../graphql/queries"
import { useLazyQuery } from "@apollo/client"

export default function XLSXExport(props){

    //const [getAllUsers, {loading, data}] = useLazyQuery(GET_ALL_USERS)

    const data = [
        { name: "John", email: "john@example.com", age: 28 },
        { name: "Jane", email: "jane@example.com", age: 32 }
    ];

    async function exportXLS(){
        //await getAllUsers()
        const exportArray = []
        props.users.forEach(el => {
            el.logs.forEach(log => {
                exportArray.push({Name: el.name, Pin: el.pin, Date:log.date, Description: log.description, Hours:log.hours})
            })
        })
        const worksheet = XLSX.utils.json_to_sheet(exportArray)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1")

        //Buffer that stores generated XLSX file
        const XLSXBuffer = XLSX.write(workbook, {booktype:'xlsx', type: 'array'})
        const blob = new Blob([XLSXBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'})

        saveAs(blob, "timesheet.xlsx")
    }

    return(
        <button onClick={exportXLS}>Export XLSX</button>
    )
}