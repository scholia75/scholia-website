import React from 'react'
import {Avatar, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {Listbox, ListboxItem} from "@nextui-org/react";
import { Cog6ToothIcon,ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline';

const ProfilePopover = () => {
  return (
    <div>
        <Popover placement="bottom" showArrow={true} backdrop='blur'>
      <PopoverTrigger>
       <button className='outline-none border-none flex flex-row items-center gap-x-3 '>
        <ChevronDownIcon className='size-6'/>
        <p className=' font-medium text-medium'>Scholia</p>
       <Avatar size='lg' src='https://img.freepik.com/photos-gratuite/portrait-homme-souriant-heureux_23-2149022627.jpg?t=st=1734402780~exp=1734406380~hmac=f1f2de687e5cba2b1211a7b0f0a621af81e205a92677af2821cf82add8db8e79&w=740'/>
       </button>
      </PopoverTrigger>
      
      <PopoverContent>
        <ul className=''>
            <li className='flex flex-row gap-x-2 items-center'>
            <Avatar size='md' src='https://img.freepik.com/photos-gratuite/portrait-homme-souriant-heureux_23-2149022627.jpg?t=st=1734402780~exp=1734406380~hmac=f1f2de687e5cba2b1211a7b0f0a621af81e205a92677af2821cf82add8db8e79&w=740'/>
            <div>
            <p className=' font-medium text-medium'>Scholia</p>
            <p className='text-default-500'>scholia@exmple.com</p>
            </div>
            </li>
            
            <Listbox aria-label="Listbox menu with descriptions" variant="flat">
            <ListboxItem
            className='text-medium font-medium'
          key="settings"
          startContent={<Cog6ToothIcon className='text-default-500 size-6'/>}
          
        >
          Paramètres
        </ListboxItem>

        <ListboxItem
            className='text-medium font-medium'
          key="logout"
          startContent={<ArrowRightStartOnRectangleIcon className='text-default-500 size-6'/>}
          
        >
          Déconnecter
        </ListboxItem>
            </Listbox>
         
           
        </ul>
      </PopoverContent>
    </Popover>
     

    </div>
  )
}

export default ProfilePopover
