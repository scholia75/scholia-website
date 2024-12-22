import { StudnetType, UserType } from '@/types';
import { create } from 'zustand';
import {parseDate} from "@internationalized/date";
import { ID } from 'appwrite';
// Zustand store type
interface UserStore {
  user: UserType | null; // Holds the user object or null if no user is logged in
  student:StudnetType;
  setStudent:(student:StudnetType)=>void
  setUser: (user: UserType) => void; // Action to set/update the user
  clearUser: () => void; // Action to clear/reset the user
  updateAvatar: (avatar: string) => void; // Action to update the avatar
  updateUser: (updates: Partial<UserType>) => void; // Action to update specific user fields

}

// Create the Zustand store
const useUserStore = create<UserStore>((set) => ({
  user: null, // Initial user state is null
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
        student,
      }))
 },
  // Action to set/update the user
  setUser: (user) =>
    set(() => ({
      user,
    })),

  // Action to clear/reset the user
  clearUser: () =>
    set(() => ({
      user: null,
    })),

  // Action to update the avatar
  updateAvatar: (avatar) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, avatar } // Update only the avatar if the user exists
        : null,
    })),

  // Action to update specific fields of the user object
  updateUser: (updates) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user, // Retain existing fields
            ...updates, // Merge updated fields
          }
        : null, // If no user exists, return null
    })),

 
}));

export default useUserStore;
