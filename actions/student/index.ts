import { databases, ID, projectData, storage } from "@/lib/appwrite";
import { DocumentType, FileType, StudnetType } from "@/types";
import {parseDate} from "@internationalized/date";
import { Query } from "appwrite";

const {databaseID,studentID,studentDocuments,documentBucket,projectID}=projectData

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
export const updateStudentEmail=async(email:string,id:string)=>{
      await databases.updateDocument(
        databaseID,
        studentID,
        id,
        {
            email
        }
      )
}
export const updateStudentAvatar=async(avatar:string,id:string)=>{
      await databases.updateDocument(
        databaseID,
        studentID,
        id,
        {
            avatar
        }
      )
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
        email:data.email,
        avatar:data.avatar,
        birthcountry:data.birthcountry,
        birthdate:parseDate(data.birthdate),
        residancecountry:data.residancecountry,
       
     }

     return student
}


export const getDocument=async(studentId:string,fileType:DocumentType)=>{
    const data=await databases.listDocuments(
      databaseID,
      studentDocuments,
      [
        Query.and(
         [
          Query.equal('student',studentId),
          Query.equal('documentType',fileType),
          
         ]
        ),
        Query.limit(1)
      ]
    )
    const fileData=data.documents[0]
    const url=`https://cloud.appwrite.io/v1/storage/buckets/${documentBucket}/files/${fileData.$id}/view?project=${projectID}`
    const file:FileType={
      id:fileData.$id,
      fileName:fileData.fileName,
      type:fileData.documentType,
      fileUrl:url,
      size:fileData.size,
      status:fileData.status,
      note:fileData.note
    }


    return file
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

export const uploadDocument=async(file:File,student:string,documentType:DocumentType)=>{
 const fileId=ID.unique()
  const result = await storage.createFile(
    documentBucket, // bucketId
    fileId, // fileId
    file, // file
);


const fileName=result.name
const size=result.sizeOriginal

const data=await databases.createDocument(
databaseID,
studentDocuments,
fileId,
{
student,
documentType,
fileName,
size
}
)
const url=`https://cloud.appwrite.io/v1/storage/buckets/${documentBucket}/files/${data.$id}/view?project=${projectID}`
const fileData:FileType={
  id:data.$id,
  fileName:data.fileName,
  type:data.documentType,
  fileUrl:url,
  size:data.size,
 status:data.status,
 note:data.note
}


return fileData
}

export const deleteDocument=async(fileId:string)=>{
  await databases.deleteDocument(
    databaseID,
    studentDocuments,
    fileId
  )
  await storage.deleteFile(
    documentBucket, // bucketId
    fileId, // fileId
);

}





