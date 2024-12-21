'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form, DatePicker, Autocomplete, AutocompleteItem } from '@nextui-org/react';
import {   StudnetType } from '@/types';
import { countries } from '@/constants';
import useRegistrationStore from '@/stores/useRegistrationStore';
import {parseDate} from "@internationalized/date";
import useStudentStore from '@/stores/useStudentStore';
import { ID } from 'appwrite';

const StudentForm = () => {
const {setStep}=useRegistrationStore()
const {setStudent}=useStudentStore()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      id:ID.unique(),
      firstname:'',
      lastname:'',
      birthdate:parseDate("2024-04-04"),
      birthcountry:countries[0].label,
      residancecountry:countries[0].label,
      phone:''
    },
  });

  const onSubmit=(data: StudnetType) => {
      setStudent(data)
     setStep(3)
  };

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
      name="birthdate"
      rules={{
        required: "Brithdate is required.",    
      }}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <DatePicker
        ref={ref}
      isRequired
      className="max-md:col-span-1 col-span-2"
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
    <div className='max-md:col-span-1 col-span-2 grid grid-cols-2 max-md:grid-cols-1 gap-3'>
    <Button className="w-full font-medium " variant='bordered' color="primary" size='lg' type="button"  onPress={()=>setStep(1)} >
    Précédent
    </Button>
    <Button className="w-full font-medium " color="primary" size='lg' type="submit"  >
     Suivant
    </Button>
    </div>
   
  </Form>
  );
};

export default StudentForm;
