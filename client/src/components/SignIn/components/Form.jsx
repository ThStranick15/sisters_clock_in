export default function Form(){
    return(
        <section className="flex flex-col w-1/4">
        <div className="bg-green-700 m-5 rounded">
                <form className="flex flex-col m-5">
                    <input className="border p-1 mb-1" type="text" name="PIN" placeholder="PIN" />
                    <input className="border p-1 my-1" type="text" name="workSubject" placeholder="What did you work on?" />
                    <button className="border p-1 my-1 text-white bg-green-600 hover:bg-green-500" type="submit">Clock In/Clock Out</button>
                </form>
                <button className="border p-1 mx-5 mb-5 text-white bg-green-600 hover:bg-green-500">No ID? Create new user here.</button>
        </div>
        <div className="bg-green-700 m-5 p-5 rounded text-white">
            <p>Checked Out/In:</p>
            <p>Users Checked In:</p>
        </div>
        </section>
        
    )
}