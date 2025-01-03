import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

//const projectID=process.env.NEXT_PUBLIC_PROJECT_ID || ''
//const databaseID=process.env.NEXT_PUBLIC_DATABASE_ID || ''
const projectID='675ec64e0037ec69f7d8'
const databaseID='675ec699003be09a6241'
export const projectData={
    projectID:projectID,
    databaseID:databaseID,
    studentID:'6764b0170024d17b8ff2',
    studentDocuments:'6773ed1e0024c1fe4537',
    documentBucket:'6773ef09001a4dbd1bff',
    trainingID:'67781801001927a436e5',
    admissionsID:'6778180c002a14dc7895'
}

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectData.projectID); 

export const account = new Account(client);
export const storage = new Storage(client);
export { ID } from 'appwrite';
export const databases=new Databases(client)

export const getSession=async()=>{
    const session = await account.getSession('current');

    return session
}

