import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../../../graphql/mutations"

export default function Form(){
    const[newUserShow, setNewUserShow] = useState(false)
    const[pin, setPin] = useState()
    const[name, setName] = useState("")
    const[text, setText] = useState("")

    const [createUser] = useMutation(CREATE_USER,{
        variables: {pin: parseInt(pin), name: name}
    })

    function handleNewUser() {
        newUserShow ? setNewUserShow(false) : setNewUserShow(true)
    }

    async function handleNewUserForm(e){
        e.preventDefault()
        console.log(pin, name)
        if(pin.length != 4){

        }
        else{
            await createUser()
            alert(`New User: ${name} with PIN: ${pin} has been created.`)
            setPin("")
            setName("")
            setNewUserShow(false)
        }
        
    }

    function handleSignIn(e){
        e.preventDefault()
        console.log(pin,text)
        setPin("")
        setText("")
    }

    return(
        <section className="flex flex-col w-3/4 md:w-1/4">
        <div className="bg-green-700 m-3 rounded">
                {!newUserShow && (<form className="flex flex-col m-3" onSubmit={handleSignIn}>
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} required min={4} max={4}/>
                    <input className="border p-1 my-1" type="text" name="workSubject" placeholder="What did you work on?" value={text} onChange={(e) => setText(e.target.value)} required/>
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500" type="submit">Clock In/Clock Out</button>
                </form>)}
                <button onClick={handleNewUser} className="border p-1 m-3 text-white bg-green-600 hover:bg-green-500">{newUserShow ? "Back to Login" :"No ID? Create new user here."}</button>
                {newUserShow && (
                <div>
                <form className="flex flex-col m-3" onSubmit={handleNewUserForm}>
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="Set a PIN" value={pin} onChange={(e) => setPin(e.target.value)} required min={4} max={4}/>
                    <input className="border p-1 my-1" type="text" name="name" placeholder="What is your name?" value={name} onChange={(e) => setName(e.target.value)} required/>
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