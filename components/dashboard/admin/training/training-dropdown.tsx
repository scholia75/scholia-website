'use client'
import { removeTraining } from '@/actions/admin/trainings'
import useTrainingStore from '@/stores/useTrainingStore'
import { TrainingType } from '@/types'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import TrainingModal from './training-modal'

const TrainingDropdown = ({training}:{training:TrainingType}) => {
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const {deleteTraining}=useTrainingStore()
    const [isLoading, setIsLoading] = useState(false)
  

    const handleDelete=async()=>{
        setIsLoading(true)
           try {
            if(training){
                await removeTraining(training.id)
                deleteTraining(training.id)
                toast.success('Les données ont été supprimées avec succès.')
                setOpenDelete(false)
            }
           

           } catch (error) {
            console.log(error)
           }finally{
            setIsLoading(false)
           }
    }
  return (
   <>
   <Modal isOpen={openDelete} onOpenChange={setOpenDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirmer la suppression</ModalHeader>
              <ModalBody>
                <p>
                Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button  variant="light" onPress={onClose} disabled={isLoading}>
                Annuler
                </Button>
                <Button color="danger"  onPress={handleDelete} isLoading={isLoading}>
                Confirmer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
   

   <TrainingModal isOpen={openEdit} onOpen={setOpenEdit} training={training}/>
    <div className="relative flex justify-end items-center gap-2">
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon icon={'radix-icons:dots-vertical'} className="text-default-400 size-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="edit" onPress={()=>setOpenEdit(true)} >Modifier</DropdownItem>
        <DropdownItem key="delete" onPress={()=>setOpenDelete(true)}>Supprimer</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
   </>
  )
}

export default TrainingDropdown
