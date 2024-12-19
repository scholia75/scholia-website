import { Client, Account } from 'appwrite';

export const client = new Client();
const projectData={
    projectID:'675ec64e0037ec69f7d8'
}
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectData.projectID); 

export const account = new Account(client);
export { ID } from 'appwrite';


export const getSession=async()=>{
    const session = await account.getSession('current');

    return session
}

