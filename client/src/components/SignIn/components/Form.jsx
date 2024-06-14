import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../../../graphql/mutations"

export default function Form(){
    const[newUserShow, setNewUserShow] = useState(false)
    const[pin, setPin] = useState(1234)
    const[name, setName] = useState("")

    const [createUser] = useMutation(CREATE_USER,{
        variables: {pin: pin, name: name}
    })

    function handleNewUser() {
        newUserShow ? setNewUserShow(false) : setNewUserShow(true)
    }

    function handleNewUserForm(e){
        e.preventDefault()
        console.log(pin, name)
        createUser()
    }

    return(
        <section className="flex flex-col w-3/4 md:w-1/4">
        <div className="bg-green-700 m-3 rounded">
                {!newUserShow && (<form className="flex flex-col m-3">
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="PIN" />
                    <input className="border p-1 my-1" type="text" name="workSubject" placeholder="What did you work on?" />
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500" type="submit">Clock In/Clock Out</button>
                </form>)}
                <button onClick={handleNewUser} className="border p-1 m-3 text-white bg-green-600 hover:bg-green-500">{newUserShow ? "Back to Login" :"No ID? Create new user here."}</button>
                {newUserShow && (
                <div>
                <form className="flex flex-col m-3" onSubmit={handleNewUserForm}>
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="Set a PIN" onChange={(e) => setPin(e.target.value)}/>
                    <input className="border p-1 my-1" type="text" name="name" placeholder="What is your name?" onChange={(e) => setName(e.target.value)}/>
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500" type="submit">Create!</button>
                </form>
                </div>)} 
        </div>
        <div className="bg-green-700 m-3 p-5 rounded text-white">
            <p>Checked Out/In:</p>
            <p>Users Checked In:</p>
        </div>
        </section>
        
    )
}