
'use client'
import { createTraining } from "@/actions/admin/trainings";
import { levels } from "@/constants";
import useTrainingStore from "@/stores/useTrainingStore";
import { TrainingType } from "@/types";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  
    Input,
    Form,
    Select,
    SelectItem,
  } from "@nextui-org/react";
import { useState } from "react";
  
  import { Controller, useForm } from 'react-hook-form';
  import toast from 'react-hot-toast';
  
  export default function TrainingModal({training,isOpen,onOpen}:{training:TrainingType,isOpen:boolean,onOpen:(isOpen:boolean)=>void}) {
  const {addTraining}=useTrainingStore()
    const [isLoading, setIsLoading] = useState(false)
   const { handleSubmit, control, reset } = useForm<TrainingType>({
      defaultValues: training,
    });

    const onSubmit=async(data: TrainingType) => {
        setIsLoading(true)
        try {
         const newTraining= await createTraining(data)
         addTraining(newTraining)
          toast.success('Formation créée avec succès')
          reset()
         onOpen(false)
        
        } catch (error) {
          if(error instanceof Error){
              toast.error(error.message)
          }
        }finally{
          setIsLoading(false)
        }
      };
    return (
      <>
       
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpen} backdrop="blur">
          <ModalContent>
            {(onClose) => (
             <Form onSubmit={handleSubmit(onSubmit)} className="">
                 <ModalHeader className="flex flex-col gap-1">Nouvelle formation</ModalHeader>
                <ModalBody className="w-full">
                    <Controller
                          control={control}
                          name="shortName"
                          rules={{
                            required: "Nom court est obligatoire.",    
                          }}
                          render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                            <Input
                              ref={ref}
                              isRequired
                              errorMessage={error?.message}
                              validationBehavior="aria"
                              isInvalid={invalid}
                              label="Nom court"
                              labelPlacement="outside"
                              type="text"
                               placeholder="Entrez le nom court"
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                             
                            />
                          )}
                        />
                 

                 <Controller
                          control={control}
                          name="longName"
                          rules={{
                            required: "Nom long est obligatoire.",    
                          }}
                          render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
                            <Input
                              ref={ref}
                              isRequired
                              errorMessage={error?.message}
                              validationBehavior="aria"
                              isInvalid={invalid}
                              label="Nom long"
                              labelPlacement="outside"
                              type="text"
                               placeholder="Entrez le nom long"
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                             
                            />
                          )}
                        />
                  

                  <Controller
  control={control}
  name="level"
  rules={{
    required: "Niveau est obligatoire.",
  }}
  render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
    <Select
      ref={ref}
      className="w-full"
      label="Sélectionner le niveau"
      labelPlacement="outside"
      required
      errorMessage={error?.message}
      validationBehavior="aria"
      isInvalid={invalid}
      selectedKeys={value ? new Set([String(value)]) : new Set()} // Use level.id as value
      onBlur={onBlur}
      onSelectionChange={(keys) => {
        const key = Array.from(keys)[0]; // Extract the selected key
        const selectedLevel = levels.find((level) => level.key === key)?.id || 1;
        onChange(selectedLevel); // Update form state with the corresponding id
      }}
    >
      {levels.map((level) => (
        <SelectItem key={level.key} textValue={`RNCP Niveau ${level.number} - Bac +${level.bac}`}>
          {`RNCP Niveau ${level.number} - Bac +${level.bac}`}
        </SelectItem>
      ))}
    </Select>
  )}
/>


                </ModalBody>
                <ModalFooter className="w-full">
                  <Button color="danger" variant="flat" onPress={onClose} isDisabled={isLoading} >
                  Fermer
                  </Button>
                  <Button color="primary"  type="submit" isLoading={isLoading}>
                  Sauvegarder
                  </Button>
                </ModalFooter>
             </Form>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  