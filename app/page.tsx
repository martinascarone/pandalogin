"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainPage = ( )=>{


    const router = useRouter()
    useEffect(() => {
       router.push('/v2')
    }, []);
    return (
        <div>

        </div>
    )
} 

export default MainPage;