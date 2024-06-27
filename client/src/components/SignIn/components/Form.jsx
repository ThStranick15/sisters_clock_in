import { useState,useEffect } from "react"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { CREATE_USER,SIGN_IN_USER, SIGN_OUT_USER } from "../../../graphql/mutations"
import { GET_USER, GET_ALL_USERS } from "../../../graphql/queries"
import { useStore } from "../../../store"
import { NavLink } from "react-router-dom"

export default function Form(){
    const [newUserShow, setNewUserShow] = useState(false)
    const [showPinErr, setShowPinErr] = useState(false)
    const [showPinLengthErr, setShowPinLengthErr] = useState(false)
    const [showCheckedIn,setShowCheckedIn] = useState(false)
    //const {state, setState} = useStore()
    const [allUsers, setAllUsers] = useState([])
    const [signedInUsers,setSignedInUsers] = useState([])
    const [recentSignIn,setRecentSignIn] = useState('')
    const [exists, setExists] = useState(false)
    const [pin, setPin] = useState()
    const [name, setName] = useState("")
    const [text, setText] = useState("")

    const [createUser] = useMutation(CREATE_USER,{
        variables: {pin: parseInt(pin), name: name}
    })

    const [signInUser] = useMutation(SIGN_IN_USER,{
        variables: {pin: parseInt(pin)}
    })

    const [signOutUser] = useMutation(SIGN_OUT_USER,{
        variables: {pin: parseInt(pin), description: text}
    })

    const [getUser, {called,loading,data}] = useLazyQuery(GET_USER,
        {fetchPolicy: 'network-only'}
    )

    const [getAllUsers, {loading: allloading, data: alldata}] = useLazyQuery(GET_ALL_USERS,
        {fetchPolicy: 'network-only'}
    )

    function handleNewUser() { //handles new user form after clicking button
        newUserShow ? setNewUserShow(false) : setNewUserShow(true)
    }

    async function loadPage(){
        const allUsers = await getAllUsers() //gets users
        setSignedInUsers(s(allUsers.data.getAllUsers)) //filters signedin users
        setAllUsers(allUsers.data.getAllUsers.map((e)=> e.pin)) //variable to reference all users on backend
        setShowPinErr(false) //on load do not show error
    }

    useEffect(()=>{ //on page load, find any users that are signed in
        loadPage()
    },[])

    useEffect(()=>{ //after signedInUsers are set, trigger load of checked in
        setShowCheckedIn(true)
    },[signedInUsers])   

    async function handleNewUserForm(e){
        e.preventDefault()
        if(pin.length != 4){ //if not 4 numbers error, else create the user
            setShowPinLengthErr(true)
        }
        else{
            setShowPinLengthErr(false)
            await createUser()
            alert(`New User: ${name} with PIN: ${pin} has been created.`)
            setPin("")
            setName("")
            setNewUserShow(false)
            const allUsers = await getAllUsers() //resets all user variable when new user created
            setAllUsers(allUsers.data.getAllUsers.map((e)=> e.pin)) 
        }
        
    }

    async function handleSignIn(e){
        e.preventDefault()
        if(allUsers.includes(parseInt(pin))){ //check whether user exists on backend
            setShowPinErr(false)
            setShowCheckedIn(false)
            const res = await getUser({ //get user that inputted pin
                variables: {pin: parseInt(pin)}
            })
    
            setRecentSignIn(res.data.getUser.name)
    
            function findPin(value){ //used below
                return value.pin === res.data.getUser.pin
            }
    
            if(signedInUsers.find(findPin)){ //check whether user is signed in
                await signOutUser() //backend time stamp
                
            }else{
                await signInUser() //backend time stamp
            }
            
            const allUsersAfter = await getAllUsers() //gets user after sign out/in
            const s1 = s(allUsersAfter.data.getAllUsers)//sets front end array to filter on signed in
            setSignedInUsers(s1)
            setPin("")
            setText("")
        } else {
            setShowPinErr(true)
        }
        
    }

    function list(){ //lists out names of people who have signed in
        const names = signedInUsers.map((e)=>e.name)
        const namesString = names.join(", ")
        return(namesString)
    }

    function s(allUsers){
        const filterSignedIn = allUsers.filter((el) => el.timeIn !== null)
        return filterSignedIn
    }

    useEffect(()=>{ //checks current pin and sees if user is signed in
        const pins = signedInUsers.map((e)=>e.pin)
        setExists(pins.includes(parseInt(pin)))
        setShowPinErr(false)
        setShowPinLengthErr(false)
    },[pin])

    return(
        <section className="flex flex-col w-3/4 md:w-1/4">
        <div className="flex flex-col bg-green-700 m-3 rounded shadow-lg">
                {!newUserShow && (<form className="flex flex-col m-3" onSubmit={handleSignIn}>
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} required/>
                    {showPinErr && (<p className="border bg-red-500 text-white px-2 py-1 w-fit rounded">Invalid PIN</p>)}
                    {exists && (<input className="border p-1 my-1" type="text" name="workSubject" placeholder="What did you work on?" value={text} onChange={(e) => setText(e.target.value)} required/>)}
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500 rounded" type="submit">{exists ? "Clock Out" : "Clock In"}</button>
                </form>)}
                {parseInt(pin) === 1050 ? <NavLink to={'/admin'} className="border p-1 mx-3 text-white bg-violet-600 hover:bg-violet-500 rounded text-center">Go to Admin</NavLink>: ""}
                <button onClick={handleNewUser} className="border p-1 m-3 text-white bg-green-600 hover:bg-green-500 rounded">{newUserShow ? "Back to Login" :"No ID? Create new user here."}</button>
                {newUserShow && (
                <div>
                <form className="flex flex-col m-3" onSubmit={handleNewUserForm}>
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="Set a PIN" value={pin} onChange={(e) => setPin(e.target.value)} required/>
                    {showPinLengthErr && (<p className="border bg-red-500 text-white px-2 py-1 w-fit rounded">PIN must be 4 numbers in length</p>)}
                    <input className="border p-1 my-1" type="text" name="name" placeholder="What is your name?" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500 rounded" type="submit">Create!</button>
                </form>
                </div>)} 
        </div>
        <div className="bg-violet-700 m-3 p-5 rounded text-white shadow-lg">
            {showCheckedIn ? (<p className="border p-1 my-1 bg-violet-500 rounded">Last Checked Out/In: {recentSignIn}</p>) : (<p>Loading</p>)}
            {showCheckedIn ?  (<p className="border p-1 my-1 bg-violet-500 rounded">Users Checked In: {list()}</p>) : (<p>Loading</p>)}
        </div>
        </section>
        
    )
}