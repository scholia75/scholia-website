
import { StudnetType } from '@/types';
import { create } from 'zustand';


// Zustand store for user registration
interface RegistrationStore {
 
  student:StudnetType| null;
  setStudent:(studentInfo:StudnetType)=>void
}

const useStudentStore = create<RegistrationStore>((set) => ({
 student:null,
setStudent(student) {
    set(() => ({
        student: student,
      }))
},
 

}));

export default useStudentStore;
