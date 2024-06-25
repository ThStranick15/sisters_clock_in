import Form from "./components/Form";

export default function Main(){
    return(
        <section className="flex flex-col md:flex-row flex-1 items-center">
            <Form/>
            <div className="md:w-3/4 bg-violet-300 py-2 mx-2 shadow-lg">
                <img className="w-11/12 m-auto" src="/GroupPic.jpg" alt="group-pic" />
            </div>
            
        </section>
    )
}