'use client';

import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form, DatePicker, Autocomplete, AutocompleteItem, cn } from '@nextui-org/react';
import {   StudnetType } from '@/types';
import { countries } from '@/constants';
import useRegistrationStore from '@/stores/useRegistrationStore';

import useUserStore from '@/stores/useUserStore';
import toast from 'react-hot-toast';
import { updateStudent } from '@/actions/student';

const StudentForm = ({isCreate}:{isCreate:boolean}) => {
const {setStep}=useRegistrationStore()
const {student,setStudent}=useUserStore()
const [isLoading, setIsLoading] = useState(false)
const handleUpdateStudent=async(student:StudnetType)=>{
    setIsLoading(true)
  try {
    await updateStudent(student)
    setStudent(student)
    toast.success('Compte modifié avec succès')
  } catch (error) {
    if(error instanceof Error){
        toast.error(error.message)
    }
  }finally{
    setIsLoading(false)
  }
  }

  const { handleSubmit, control, reset } = useForm<StudnetType>({
    defaultValues: student,
  });


  const onSubmit=async(data: StudnetType) => {
   if(isCreate){
    setStudent(data)
    setStep(3)
   }else{
    await handleUpdateStudent(data)
   }
   
  };

  useEffect(() => {
    if (student) {
      reset(student); // Dynamically update form values when `student` changes
    }
  }, [student, reset]);
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="max-md:grid-cols-1 grid grid-cols-2 gap-5">
    {/* First Name field Field */}
    <Controller
      control={control}
      name="firstname"
      rules={{
        required: "Nom est obligatoire.",    
      }}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <Input
          ref={ref}
          isRequired
          errorMessage={error?.message}
          validationBehavior="aria"
          isInvalid={invalid}
          label="Nom"
          labelPlacement="outside"
          type="text"
          placeholder="Entrez votre nom"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
         
        />
      )}
    />

{/* First Name field Field */}
<Controller
      control={control}
      name="lastname"
      rules={{
        required: "Le prénom est obligatoire.",
       
      }}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <Input
          ref={ref}
          isRequired
          errorMessage={error?.message}
          validationBehavior="aria"
          isInvalid={invalid}
          label="Prénom"
          labelPlacement="outside"
          type="text"
          placeholder="Entrez votre prénom"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
         
        />
      )}
    />
     
     <Controller
      control={control}
      name="phone"
      rules={{
        required: "Le téléphone est obligatoire.",
       
      }}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <Input
          ref={ref}
          isRequired
          errorMessage={error?.message}
          validationBehavior="aria"
          isInvalid={invalid}
          label="Téléphone"
          labelPlacement="outside"
          type="text"
          placeholder="Entrez votre téléphone"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
         
        />
      )}
    />
   <Controller
      control={control}
      name="birthdate"
      rules={{
        required: "Brithdate is required.",    
      }}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <DatePicker
        ref={ref}
      isRequired
     
      label="Date de naissance"
      labelPlacement="outside"
      errorMessage={error?.message}
      validationBehavior="aria"
      isInvalid={invalid}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
      )}
    />
   
   
   <Controller
  control={control}
  name="birthcountry"
  rules={{
    required: "Le pays est obligatoire.",
  }}
  render={({ field: { value, onChange, ref }, fieldState: { invalid, error } }) => (
    <Autocomplete
      isRequired
      className=""
      defaultItems={countries}
      label="Pays de naissance"
      placeholder="Rechercher un pays"
      labelPlacement="outside"
      errorMessage={error?.message}
      validationBehavior="aria"
      isInvalid={invalid}
      selectedKey={countries.find((c) => c.label === value)?.key}
      ref={ref}
      onSelectionChange={(key) => {
        const selectedCountry = countries.find((c) => c.key === key);
        onChange(selectedCountry?.label || "");
      }}
    >
      {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  )}
/>

<Controller
  control={control}
  name="residancecountry"
  rules={{
    required: "Le pays est obligatoire.",
  }}
  render={({ field: { value, onChange, ref }, fieldState: { invalid, error } }) => (
    <Autocomplete
      isRequired
      className=""
      defaultItems={countries}
      label="Pays de résidence"
      placeholder="Rechercher un pays"
      labelPlacement="outside"
      errorMessage={error?.message}
      validationBehavior="aria"
      isInvalid={invalid}
      selectedKey={countries.find((c) => c.label === value)?.key}
      ref={ref}
      onSelectionChange={(key) => {
        const selectedCountry = countries.find((c) => c.key === key);
        onChange(selectedCountry?.label || "");
      }}
    >
      {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
    </Autocomplete>
  )}
/>
    <div className={cn('max-md:col-span-1 col-span-2 ',isCreate && 'grid grid-cols-2 max-md:grid-cols-1 gap-3')}>
  {
    isCreate &&   <Button className="w-full font-medium " variant='bordered' color="primary" size='lg' type="button"  onPress={()=>setStep(1)} >
    Précédent
    </Button>
  }
    <Button className="w-full font-medium " color="primary" size='lg' type="submit" isLoading={isLoading}   >
     {isCreate ?'Suivant':'Savegarder'}
    </Button>
    </div>
   
  </Form>
  );
};

export default StudentForm;
