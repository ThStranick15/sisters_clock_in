import { useState } from "react"
import { GET_USER, GET_ALL_USERS } from "../../graphql/queries"
import { useLazyQuery } from "@apollo/client"

export default function Admin() {
    const [result, setResult] = useState([])
    const[pin, setPin] = useState()

    const [getUser, {called,loading,data}] = useLazyQuery(GET_USER,
        {fetchPolicy: 'network-only'}
    )
    //const [getUsers, {called,loading,data}] = useLazyQuery(GET_ALL_USERS)

    async function handleSearch(e){
        e.preventDefault()
        console.log(pin)
        const res = await getUser({
            variables: {pin: parseInt(pin)}
        })
        console.log(res.data.getUser)
    }

    function totalHours() {
        let sum = 0;

        data?.getUser.logs.forEach(el => {
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
            <h1>Admin Page</h1>
            <div className="flex flex-row bg-green-700 m-3 rounded p-3">
                <form onSubmit={handleSearch}>
                    <input className="border mx-2 rounded p-2" type="text" name="pin" placeholder="Enter Pin" value={pin} onChange={(e) => setPin(e.target.value)}/>
                    <button className="border p-1 my-1 mx-2 text-white bg-green-600 hover:bg-green-500 rounded" type="submit">Search</button>
                </form>
                <button className="border p-1 my-1 mx-2 text-white bg-green-600 hover:bg-green-500 rounded">List All Students</button>
            </div>
            {(loading || !data) ? '' : 
            <div className="flex flex-col ">
                <div className="flex flex- bg-violet-700 text-md text-white rounded">
                    <p className="bg-violet-500 m-2 p-2 rounded">Pin: {data?.getUser.pin}</p> 
                    <p className="bg-violet-500 m-2 p-2 rounded">Name: {data?.getUser.name}</p>
                    <p className="bg-violet-500 m-2 p-2 rounded">Days: {totalHours().days} Hours: {totalHours().hours} Minutes: {totalHours().minutes} Seconds: {totalHours().seconds}</p>
                </div> 
                <div className="flex flex-col bg-violet-700 my-2 p-2 text-md text-white rounded">
                     {data?.getUser.logs.map(e => {return <p className="bg-violet-500 m-2 p-2 rounded">{e.date} {e.description} {e.hours}</p>})}
                </div>
            </div>
            }
        </section>
        
    )
}