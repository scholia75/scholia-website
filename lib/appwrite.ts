import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

const projectID=process.env.NEXT_PUBLIC_PROJECT_ID || ''
const databaseID=process.env.NEXT_PUBLIC_DATABASE_ID || ''

export const projectData={
    projectID:projectID,
    databaseID:databaseID,
    studentID:'6764b0170024d17b8ff2',
}

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectData.projectID); 

export const account = new Account(client);
export { ID } from 'appwrite';
export const databases=new Databases(client)

export const getSession=async()=>{
    const session = await account.getSession('current');

    return session
}

