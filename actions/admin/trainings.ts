
import {  Query } from "appwrite"
import {  databases, projectData } from "@/lib/appwrite"
import { TrainingType } from "@/types"

const {databaseID,trainingID}=projectData

export const  getAllTraining=async(limit:number,page:number)=>{
    const offset = (page - 1) * limit;
    const data=await databases.listDocuments(
       databaseID,
       trainingID,
      [ 
       Query.offset(offset),
       Query.limit(limit)
      ]
    )
    const trainingList=data.documents.map((item)=>{
   
      const training:TrainingType={
        id:item.$id,
        level:item.level,
        longName:item.longName,
        shortName:item.shortName
       
      }
  
      return training
  })
  
  
  const total=data.total
  
  return {trainingList,total}
  }
  
  export const searchTraining=async(value:string,limit:number,page:number)=>{
      
    const offset = (page - 1) * limit;
    const data=await databases.listDocuments(
       databaseID,
       trainingID,
      [ 
      Query.or([
        Query.contains('shortName',value),
        Query.contains('longName',value),
      ]),
      Query.offset(offset),
      Query.limit(limit)
      ]
    )
    const trainingList=data.documents.map((item)=>{
     
      const training:TrainingType={
        id:item.$id,
        level:item.level,
        longName:item.longName,
        shortName:item.shortName
       
      }
  
      return training
  })
  
  
  const total=data.total
  
  return {trainingList,total}
   
  }


export const  createTraining=async(training:TrainingType)=>{
    const {id,level,longName,shortName}=training
      const data=await databases.createDocument(
        databaseID,
        trainingID,
        id,
        {
          longName,
          shortName,
          level
        }
      )

      const newTraining:TrainingType={
        id:data.$id,
        longName:data.longName,
        shortName:data.shortName,
        level:data.level

      }

      return newTraining
}

export const removeTraining=async(id:string)=>{
    await databases.deleteDocument(
        databaseID,
        trainingID,
        id
    )
}