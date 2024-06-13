import Form from "./components/Form";

export default function Main(){
    return(
        <section className="flex flex-row flex-1 items-center">
            <Form/>
            <div className="w-3/4 bg-violet-300 m-2 p-2">
                <img className="w-11/12 m-auto" src="/GroupPic.jpg" alt="group-pic" />
            </div>
            
        </section>
    )
}