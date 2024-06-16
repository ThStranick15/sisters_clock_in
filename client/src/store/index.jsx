import { useContext, createContext, useState } from "react";

const Context = createContext()

export function StoreProvider(props){
    const initalState = {
        signedIn: []
    }

    const [state, setState] = useState(initalState)

    return(
        <Context.Provider value={{state,setState}}>
            {props.children}
        </Context.Provider>
    )
}

export const useStore = () => useContext(Context)