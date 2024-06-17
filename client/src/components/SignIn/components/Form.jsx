import { useState,useEffect } from "react"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { CREATE_USER,SIGN_IN_USER, SIGN_OUT_USER } from "../../../graphql/mutations"
import { GET_USER } from "../../../graphql/queries"
import { useStore } from "../../../store"

export default function Form(){
    const[newUserShow, setNewUserShow] = useState(false)
    const {state, setState} = useStore()
    const[signedInUsers,setSignedInUsers] = useState([])
    const[recentSignIn,setRecentSignIn] = useState('')
    const[pin, setPin] = useState()
    const[name, setName] = useState("")
    const[text, setText] = useState("")

    const [createUser] = useMutation(CREATE_USER,{
        variables: {pin: parseInt(pin), name: name}
    })

    const [signInUser] = useMutation(SIGN_IN_USER,{
        variables: {pin: parseInt(pin)}
    })

    const [signOutUser] = useMutation(SIGN_OUT_USER,{
        variables: {pin: parseInt(pin), description: text}
    })

    const [getUser, {called,loading,data}] = useLazyQuery(GET_USER)

    function handleNewUser() {
        newUserShow ? setNewUserShow(false) : setNewUserShow(true)
    }

    async function handleNewUserForm(e){
        e.preventDefault()
        console.log(pin, name)
        if(pin.length != 4){
            console.log("Not 4 length")
        }
        else{
            await createUser()
            alert(`New User: ${name} with PIN: ${pin} has been created.`)
            setPin("")
            setName("")
            setNewUserShow(false)
        }
        
    }

    async function handleSignIn(e){
        e.preventDefault()
        const res = await getUser({
            variables: {pin: parseInt(pin)}
        })
        console.log(res)
        setRecentSignIn(res.data.getUser.name)
            if(signedInUsers.includes(res.data.getUser)){
                setSignedInUsers(prevUsers => {return prevUsers.filter((user)=>user !== res.data.getUser)}) //front end
                signOutUser()
                }
                else{
                setSignedInUsers(prevUsers => [...prevUsers, res.data.getUser]) //front end
                signInUser()
                }
        setPin("")
        setText("")
    }

    // useEffect(()=>{
    //     if(!loading && data?.getUser){
    //         console.log("here")
    //         setRecentSignIn(data.getUser.name)
    //         if(signedInUsers.includes(data.getUser)){
    //             setSignedInUsers(prevUsers => {return prevUsers.filter((user)=>user !== data.getUser)}) //front end
    //             //signOutUser()
    //             }
    //             else{
    //             setSignedInUsers(prevUsers => [...prevUsers, data.getUser]) //front end
    //             //signInUser()
    //             }
    //     }
    // },[called])

    function list(){
        const names = signedInUsers.map((e)=>e.name)
        const namesString = names.join(", ")
        return(namesString)
    }

    return(
        <section className="flex flex-col w-3/4 md:w-1/4">
        <div className="bg-green-700 m-3 rounded">
                {!newUserShow && (<form className="flex flex-col m-3" onSubmit={handleSignIn}>
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} required/>
                    <input className="border p-1 my-1" type="text" name="workSubject" placeholder="What did you work on?" value={text} onChange={(e) => setText(e.target.value)} required/>
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500" type="submit">Clock In/Clock Out</button>
                </form>)}
                <button onClick={handleNewUser} className="border p-1 m-3 text-white bg-green-600 hover:bg-green-500">{newUserShow ? "Back to Login" :"No ID? Create new user here."}</button>
                {newUserShow && (
                <div>
                <form className="flex flex-col m-3" onSubmit={handleNewUserForm}>
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="Set a PIN" value={pin} onChange={(e) => setPin(e.target.value)} required/>
                    <input className="border p-1 my-1" type="text" name="name" placeholder="What is your name?" value={name} onChange={(e) => setName(e.target.value)} required/>
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500" type="submit">Create!</button>
                </form>
                </div>)} 
        </div>
        <div className="bg-green-700 m-3 p-5 rounded text-white">
            {(called && loading) ? (<p>Loading</p>) : (<p>Checked Out/In: {recentSignIn}</p>)}
            {(called && loading) ? (<p>Loading</p>) : (<p>Users Checked In: {list()}</p>)}
        </div>
        </section>
        
    )
}