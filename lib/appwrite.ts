import { Client, Account } from 'appwrite';

export const client = new Client();
const projectData={
    projectID:process.env.NEXT_PUBLIC_PROJECT_ID || ''
}
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectData.projectID); 

export const account = new Account(client);
export { ID } from 'appwrite';

export const loginUser = async (email:string, password:string) => {
    const session = await account.createEmailPasswordSession(email, password);
    return session
};export const getSession=async()=>{
    const session = await account.getSession('current');

    return session
}
export const getUserAvatar=async()=>{
    const avatar=await account.getPrefs()
    return avatar
}
