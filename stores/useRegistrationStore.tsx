import { create } from 'zustand';

type UserType = 'partner' | 'student';

// Zustand store for user registration
interface RegistrationStore {
  userType: UserType; // Holds the current user type
  isSelected: boolean; // Indicates if a user type is selected
  setUserType: (type: UserType) => void; // Action to set the user type
  setIsSelected: (selected: boolean) => void; // Action to set isSelected
}

const useRegistrationStore = create<RegistrationStore>((set) => ({
  userType: 'partner', // Initial userType
  isSelected: false, // Initial selection state

  // Action to set/update the userType and mark it as selected
  setUserType: (type) =>
    set(() => ({
      userType: type,
    })),

  // Action to explicitly set the isSelected state
  setIsSelected: (selected) =>
    set(() => ({
      isSelected: selected,
    })),
}));

export default useRegistrationStore;
