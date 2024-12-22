import { databases, projectData } from "@/lib/appwrite";
import { StudnetType } from "@/types";
import {parseDate} from "@internationalized/date";

const {databaseID,studentID}=projectData

export const createStudent=async(newStudent:StudnetType)=>{
          const {id,birthcountry,birthdate,firstname,lastname,residancecountry,phone}=newStudent

         const data=await databases.createDocument(
            databaseID,
            studentID,
            id,
            {
            firstname,
            lastname,
            birthdate:birthdate.toString(),
            birthcountry,
            phone,
            residancecountry
            }
            )


            return data
}

export const getStudnet=async(id:string)=>{
     const data=await databases.getDocument(
        databaseID,
        studentID,
         id
     )

     const student:StudnetType={
        id:data.$id,
        firstname:data.firstname,
        lastname:data.lastname,
        phone:data.phone,
        birthcountry:data.birthcountry,
        birthdate:parseDate(data.birthdate),
        residancecountry:data.residancecountry
     }

     return student
}

export const updateStudent=async(student:StudnetType)=>{
    const {id,birthcountry,birthdate,firstname,lastname,residancecountry,phone}=student
    const data=await databases.updateDocument(
        databaseID,
        studentID,
        id,
        {
        firstname,
        lastname,
        birthdate:birthdate.toString(),
        birthcountry,
        phone,
        residancecountry
        }
        )


        return data
}