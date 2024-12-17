import { getSession } from "@/lib/appwrite"
import { Models } from "appwrite"
import { useEffect, useState } from "react"


export const useSession=()=>{
      const [isLoading, setIsLoading] = useState(true)
      const [session, setSession] = useState<Models.Session>()
 useEffect(() => {
      const fetchSession=async()=>{
    
      try {
        const session=await getSession()
        setSession(session)
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
      
      }
      fetchSession()
    }, [])


    return {session,isLoading}
}