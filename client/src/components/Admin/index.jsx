import { useState } from "react"
import { GET_USER, GET_ALL_USERS } from "../../graphql/queries"
import { useLazyQuery, useQuery } from "@apollo/client"
import XLSXExport from "./components/xlsx"

export default function Admin() {
    const [result, setResult] = useState([])
    const[pin, setPin] = useState()

    const [getUser, {loading: userloading, data: userdata}] = useLazyQuery(GET_USER,
        {fetchPolicy: 'network-only'}
    )
    const [getAllUsers, {loading: allloading, data: alldata}] = useLazyQuery(GET_ALL_USERS)

    const {loading: allloadingxlsx, data: alldataxlsx} = useQuery(GET_ALL_USERS)

    async function handleSearch(e){
        e.preventDefault()
        const res = await getUser({
            variables: {pin: parseInt(pin)}
        })
    }

    function totalHours(user) {
        let sum = 0;

        user.logs.forEach(el => {
            sum = sum + el.hours
        });

        let days = Math.floor(sum / 24)
        let hours = Math.floor(sum % 24)
        let minutes = Math.floor(sum % 1 * 60)
        let seconds = Math.floor(((sum % 1 * 60) % 1) * 60)
        return {
            days,
            hours,
            minutes,
            seconds
        }
    }

    return(
        <section className="flex flex-col flex-1 items-center">
            <h1 className="text-xl m-2 p-2 bg-violet-600 text-white rounded">Admin Page</h1>
            <XLSXExport users={alldataxlsx.getAllUsers}/>
            <div className="flex flex-row bg-green-700 m-3 rounded p-3">
                <form onSubmit={handleSearch}>
                    <input className="border mx-2 rounded p-2" type="text" name="pin" placeholder="Enter Pin" value={pin} onChange={(e) => setPin(e.target.value)}/>
                    <button className="border p-1 my-1 mx-2 text-white bg-green-600 hover:bg-green-500 rounded" type="submit">Search</button>
                </form>
                <button className="border p-1 my-1 mx-2 text-white bg-green-600 hover:bg-green-500 rounded" onClick={getAllUsers}>List All Students</button>
            </div>
            {(userloading || !userdata) ? '' : 
            <div className="flex flex-col ">
                <div className="flex flex- bg-violet-700 text-md text-white rounded">
                    <p className="bg-violet-500 m-2 p-2 rounded">Pin: {userdata?.getUser.pin}</p> 
                    <p className="bg-violet-500 m-2 p-2 rounded">Name: {userdata?.getUser.name}</p>
                    <p className="bg-violet-500 m-2 p-2 rounded">{totalHours(userdata?.getUser).days} Days {totalHours(userdata?.getUser).hours} Hours  {totalHours(userdata?.getUser).minutes} Minutes {totalHours(userdata?.getUser).seconds} Seconds</p>
                </div> 
                <div className="flex flex-col bg-violet-700 my-2 p-2 text-md text-white rounded">
                     {userdata?.getUser.logs.map(e => {return (
                        <div className="bg-violet-500 m-2 p-2 rounded">
                            <p>Date: {e.date}</p>
                            <p>Worked On: {e.description}</p> <p>Hours: {e.hours}</p>
                        </div>
                      )})}
                </div>
            </div>
            }
            {(allloading || !alldata)? '':
            <div className="flex flex-col bg-violet-700 text-md text-white rounded">
                {alldata.getAllUsers.map(e => {return(
                    <div className="flex bg-violet-500 m-2 p-2 rounded justify-between">
                        <p className="mx-2">Name: {e.name}</p>
                        <p className="mx-2">Total Hours: {totalHours(e).hours}</p>
                    </div>
                    )})}
            </div>
            }
        </section>
        
    )
}