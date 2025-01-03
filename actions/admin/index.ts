

import { databases, projectData } from "@/lib/appwrite"
import {  StudnetType } from "@/types"
import { Query } from "appwrite"

const {databaseID,studentID}=projectData


export const getAllStudents=async(limit:number,page:number)=>{
    const offset = (page - 1) * limit;
     const data=await databases.listDocuments(
        databaseID,
        studentID,
       [ 
        Query.offset(offset),
        Query.limit(limit)
       ]
     )
     const students=data.documents.map((item)=>{
          const student:StudnetType={
            id:item.$id,
            firstname:item.firstname,
            lastname:item.lastname,
            birthcountry:item.birthcountry,
            birthdate:item.birthdate,
            phone:item.phone,
            email:item.email,
            avatar:item.avatar,
            residancecountry:item.residancecountry,
           
          }

          return student
     })
  

    const total=data.total
     
     return {students,total}
}

export const searchStudent=async(value:string,limit:number,page:number)=>{
    
    const offset = (page - 1) * limit;
    const data=await databases.listDocuments(
       databaseID,
       studentID,
      [ 
      Query.or([
        Query.contains('firstname',value),
        Query.contains('lastname',value),
        Query.contains('phone',value),
      ]),
      Query.offset(offset),
      Query.limit(limit)
      ]
    )
  
    const students=data.documents.map((item)=>{
         const student:StudnetType={
           id:item.$id,
           firstname:item.firstname,
           lastname:item.lastname,
           birthcountry:item.birthcountry,
           birthdate:item.birthdate,
           phone:item.phone,
           email:item.email,
           avatar:item.avatar,
           residancecountry:item.residancecountry,
          
         }

         return student
    })
 

    const total=data.total
     
    return {students,total}
}

