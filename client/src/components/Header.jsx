import { useLocation } from "react-router-dom"
import { NavLink } from "react-router-dom";

export default function Header() {  
    let location = useLocation();

    return(
        <header className="relative text-4xl bg-violet-500 p-3 text-white text-center">
        {location.pathname !== '/' ? <NavLink to="/" className="absolute top-1 left-1 border p-2 my-1 mx-2 text-white bg-violet-600 hover:bg-violet-500 rounded text-xl">Back to Home</NavLink> : ""}
            <h1 className="">8513 Sisters 1st Sign In</h1>
        </header>
    )
}