import Link from 'next/link';
import { useState } from "react"
export default function Login ({login}){
    const [id, setID] = useState(1)
    function handleChange(e){
        setID(e.target.value)
    }
    return(
        <>
            <h1>Enter your id</h1>
            <input 
                placeholder="Enter assigned id"
                label="User ID"
                onChange={handleChange}
            />
            <Link href={`/home?id=${id}`}>
                <button >sign in</button>
            </Link>
            
        </>
    )
}