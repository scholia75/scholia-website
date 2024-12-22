
import { StudnetType } from '@/types';
import {parseDate} from "@internationalized/date";
import { ID } from 'appwrite';
import { create } from 'zustand';


// Zustand store for user registration
interface RegistrationStore {
 
  student:StudnetType;
  setStudent:(studentInfo:StudnetType)=>void
}

const useStudentStore = create<RegistrationStore>((set) => ({
 student:{
    id:ID.unique(),
    birthcountry:'',
    firstname:'',
    lastname:'',
    birthdate:parseDate("2024-04-04"),
    residancecountry:'',
    phone:''
 },
setStudent(student) {
    set(() => ({
        student: student,
      }))
},
 

}));

export default useStudentStore;
