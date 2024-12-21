'use client'
import React from 'react'
import {Avatar,  DropdownSection} from "@nextui-org/react";
import { UserCircleIcon,ArrowRightStartOnRectangleIcon,ChevronDownIcon} from '@heroicons/react/24/outline';
import { account } from '@/lib/appwrite';
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
   const {user,clearUser}=useUserStore()
    const router=useRouter()

    const logout = async () => {
        try {
            await account.deleteSession("current");
            
         router.replace('/auth/login')
         clearUser()
        } catch (error) {
            console.log(error)
        }
      };

  
    
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
      <div className='flex flex-row items-center gap-x-2 cursor-pointer'>
        <ChevronDownIcon className='size-6'/>
      <p className='text-lg font-medium capitalize'>
            {user?.name}
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
              description={user?.email}
              name={user?.name}
            />
          </DropdownItem>
              </DropdownSection>
      
          <DropdownSection showDivider aria-label="links">
          <DropdownItem    startContent={<UserCircleIcon className='text-default-500 size-6'/>}  onPress={()=>router.push('/dashboard/profile')}  key="account">Profil</DropdownItem>
        
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
