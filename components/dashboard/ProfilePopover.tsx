'use client'
import React, { useEffect, useState } from 'react'
import {Avatar, Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {Listbox, ListboxItem} from "@nextui-org/react";
import { Cog6ToothIcon,ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline';
import { account, getUserAvatar } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

const ProfilePopover = () => {
    const [avatar, setavatar] = useState()
    const router=useRouter()
    const logout = async () => {
        try {
            await account.deleteSession("current");
         router.replace('/auth/login')
        } catch (error) {
            
        }
      };
    useEffect(() => {

        const fetchAvatar=async()=>{
          const avatar=await getUserAvatar()
          console.log(avatar['avatar'])

          setavatar(avatar['avatar'])
        }
        fetchAvatar()
    }, [])
    
    
  return (
    <div>
        <Popover placement="bottom" showArrow={true} backdrop='blur'>
      <PopoverTrigger>
       <button className='outline-none border-none flex flex-row items-center gap-x-3 '>
        <ChevronDownIcon className='size-5'/>
        <p className=' font-medium text-medium'>Scholia</p>
       <Avatar size='lg' src={avatar} color='primary' className='border border-separate'/>
       </button>
      </PopoverTrigger>
      
      <PopoverContent>
        <ul className=''>
            <li className='flex flex-row gap-x-2 items-center'>
            <Avatar size='md' src={avatar} color='primary'  className='border border-separate'/>
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
        onPress={logout}
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
