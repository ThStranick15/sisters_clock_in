import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'

export default function XLSXExport(props){

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
        <button className="border p-1 my-1 mx-2 text-white bg-green-600 hover:bg-green-500 rounded" onClick={exportXLS}>Export XLSX</button>
    )
}