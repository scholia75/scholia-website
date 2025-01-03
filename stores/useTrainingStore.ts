import { TrainingType } from '@/types';
import { create } from 'zustand';

// Zustand store for user registration
interface TrainingStore {
  trainig: TrainingType | null;
  trainingList: TrainingType[];
  isTrainingModalOpen: boolean;  // State to track the modal visibility
  setTraining: (training: TrainingType) => void;
  setTrainingList: (trainings: TrainingType[]) => void;
  addTraining: (newTraining: TrainingType) => void;
  deleteTraining: (id: string) => void;
  editTraining: (id: string, updatedTraining: Partial<TrainingType>) => void;
  setOpenTrainingModal: (isOpen: boolean) => void; // Function to set the modal state
}

const useTrainingStore = create<TrainingStore>((set) => ({
  trainig: null,
  trainingList: [],
  isTrainingModalOpen: false,  // Default is closed
  setTraining: (training) => set({ trainig: training }),
  setTrainingList: (trainings) => set({ trainingList: trainings }),
  addTraining: (newTraining) =>
    set((state) => ({
      trainingList: [...state.trainingList, newTraining],
    })),
  deleteTraining: (id) =>
    set((state) => ({
      trainingList: state.trainingList.filter((training) => training.id !== id),
    })),
  editTraining: (id, updatedTraining) =>
    set((state) => ({
      trainingList: state.trainingList.map((training) =>
        training.id === id ? { ...training, ...updatedTraining } : training
      ),
    })),
  setOpenTrainingModal: (isOpen) => set({ isTrainingModalOpen: isOpen }), // Set the modal state
}));

export default useTrainingStore;
