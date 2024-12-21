import { databases, projectData } from "@/lib/appwrite";
import { StudnetType } from "@/types";

const {databaseID,studentID}=projectData

export const createStudent=async(newStudent:StudnetType)=>{
          const {id,birthcountry,birthdate,firstname,lastname,residancecountry}=newStudent

         const data=await databases.createDocument(
            databaseID,
            studentID,
            id,
            {
            firstname,
            lastname,
            birthdate:birthdate.toString(),
            birthcountry,
            residancecountry
            }
            )


            return data
}