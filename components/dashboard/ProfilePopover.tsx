'use client'
import React, { useEffect, useState } from 'react'
import {Avatar,  DropdownSection} from "@nextui-org/react";
import { UserCircleIcon,ArrowRightStartOnRectangleIcon,LockClosedIcon,ChevronDownIcon} from '@heroicons/react/24/outline';
import { account, getUserAvatar } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    User,
  } from "@nextui-org/react";
import useUserStore from '@/stores/useUserStore';
const ProfilePopover = () => {
   const {user}=useUserStore()
    const router=useRouter()
    const logout = async () => {
        try {
            await account.deleteSession("current");
         router.replace('/auth/login')
        } catch (error) {
            console.log(error)
        }
      };
    useEffect(() => {

    }, [])
    
    
  return (
    <div>
       
         <Dropdown  
         
          showArrow
          classNames={{
            base: "before:bg-default-200", 
            content: "p-0 border-small border-divider bg-background",
          }}
          radius="sm"
         placement="bottom-end" 
         backdrop="blur" >
       <DropdownTrigger>
      <div className='flex flex-row items-center gap-x-3 cursor-pointer'>
        <ChevronDownIcon className='size-6'/>
      <p className='text-lg font-medium'>
            Scholia
        </p>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user?.avatar} 
          />
      </div>
        </DropdownTrigger>
        <DropdownMenu  
        variant='flat'
        aria-label="Custom item styles"
        className="p-3"
        disabledKeys={["profile"]}
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
        
        >
              <DropdownSection showDivider aria-label="profile">
              <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100 ">
            <User
              avatarProps={{
                size: "sm",
                src: user?.avatar,
                
                isBordered:true
              }}
              classNames={{
                name: "text-default-600 font-medium",
                description: "text-default-500",

              }}
              description="@jrgarciadev"
              name="Junior Garcia"
            />
          </DropdownItem>
              </DropdownSection>
      
          <DropdownSection showDivider aria-label="links">
          <DropdownItem    startContent={<UserCircleIcon className='text-default-500 size-6'/>}  onPress={()=>router.push('/dashboard/account')}  key="account">Compte</DropdownItem>
          <DropdownItem  startContent={<LockClosedIcon className='text-default-500 size-6'/>} onPress={()=>router.push('/dashboard/password')} key="password"> Mot de pass</DropdownItem> 
          </DropdownSection>
    
          <DropdownItem    startContent={<ArrowRightStartOnRectangleIcon className='text-danger size-6'/>} onPress={logout} key="logout" className='text-danger hover:text-danger' color="danger">
             Déconnecter
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
     

    </div>
  )
}

export default ProfilePopover
