import { AdminType, PartnerType, StudnetType, UserType } from '@/types';
import { create } from 'zustand';
import { parseDate } from '@internationalized/date';
import { ID } from 'appwrite';

// Zustand store type
interface UserStore {
  type: UserType | null; // Holds the user object or null if no user is logged in
  student: StudnetType; // Student type data
  partner: PartnerType | null; // Partner type data
  admin: AdminType | null; // Admin type data
  setStudent: (student: StudnetType) => void; // Action to set/update the student
  setPartner: (partner: PartnerType) => void; // Action to set/update the partner
  setAdmin: (admin: AdminType) => void; // Action to set/update the admin
  setUserType: (type: UserType) => void; // Action to set/update the user type
  clearUser: () => void; // Action to clear/reset the user data
  updateAvatar: (avatar: string) => void; // Action to update the avatar based on user type
  updateUser: (updates: Partial<StudnetType | PartnerType | AdminType>) => void; // Action to update specific user fields
  updateEmail: (email: string) => void; // Action to update email for the current user type
}

// Create the Zustand store
const useUserStore = create<UserStore>((set) => ({
  type: null, // Initial user type is null
  student: {
    id: ID.unique(),
    birthcountry: '',
    firstname: '',
    lastname: '',
    birthdate: parseDate('2024-04-04'),
    residancecountry: '',
    phone: '',
    email: '',
    avatar: '',
  },
  partner: null, // Initial partner state
  admin: null, // Initial admin state

  // Action to set/update the student
  setStudent: (student) =>
    set(() => ({
      student,
    })),

  // Action to set/update the partner
  setPartner: (partner) =>
    set(() => ({
      partner,
    })),

  // Action to set/update the admin
  setAdmin: (admin) =>
    set(() => ({
      admin,
    })),

  // Action to set/update the user type
  setUserType: (type) =>
    set(() => ({
      type,
    })),

  // Action to clear/reset the user data
  clearUser: () =>
    set(() => ({
      type: null,
      student: {
        id: ID.unique(),
        birthcountry: '',
        firstname: '',
        lastname: '',
        birthdate: parseDate('2024-04-04'),
        residancecountry: '',
        phone: '',
        email: '',
        avatar: '',
        status: 'en attente',
      },
      partner: null,
      admin: null,
    })),

  // Action to update the avatar based on user type
  updateAvatar: (avatar) =>
    set((state) => {
      const { type } = state;

      if (type === 'student') {
        return {
          student: {
            ...state.student,
            avatar,
          },
        };
      }

      if (type === 'partner' && state.partner) {
        return {
          partner: {
            ...state.partner,
            avatar,
          },
        };
      }

      if (type === 'admin' && state.admin) {
        return {
          admin: {
            ...state.admin,
            avatar,
          },
        };
      }

      return {}; // No updates if type is null or the specific user type object is null
    }),

  // Action to update specific fields based on user type
  updateUser: (updates) =>
    set((state) => {
      const { type } = state;

      if (type === 'student') {
        return {
          student: {
            ...state.student,
            ...updates,
          },
        };
      }

      if (type === 'partner' && state.partner) {
        return {
          partner: {
            ...state.partner,
            ...updates,
          },
        };
      }

      if (type === 'admin' && state.admin) {
        return {
          admin: {
            ...state.admin,
            ...updates,
          },
        };
      }

      return {}; // No updates if type is null or the specific user type object is null
    }),

  // Action to update the email based on user type
  updateEmail: (email) =>
    set((state) => {
      const { type } = state;

      if (type === 'student') {
        return {
          student: {
            ...state.student,
            email,
          },
        };
      }

      if (type === 'partner' && state.partner) {
        return {
          partner: {
            ...state.partner,
            email,
          },
        };
      }

      if (type === 'admin' && state.admin) {
        return {
          admin: {
            ...state.admin,
            email,
          },
        };
      }

      return {}; // No updates if type is null or the specific user type object is null
    }),
}));

export default useUserStore;
