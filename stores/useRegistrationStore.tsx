
import { StudnetType } from '@/types';
import { create } from 'zustand';

type UserType = 'partner' | 'student';

// Zustand store for user registration
interface RegistrationStore {
  userType: UserType; // Holds the current user type
  step:number;
  studentInfo:StudnetType| null;
  setUserType: (type: UserType) => void; // Action to set the user type
  setStep:(step:number)=>void;
  setStudentInfo:(studentInfo:StudnetType)=>void
}

const useRegistrationStore = create<RegistrationStore>((set) => ({
  userType: 'partner', // Initial userType
  step:1,
  studentInfo:null,
  setStep(step) {
    set(() => ({
        step: step,
      }))
  },
  // Action to set/update the userType
  setUserType: (type) =>
    set(() => ({
      userType: type,
    })),
setStudentInfo(studentInfo) {
    set(() => ({
        studentInfo: studentInfo,
      }))
},
 

}));

export default useRegistrationStore;
