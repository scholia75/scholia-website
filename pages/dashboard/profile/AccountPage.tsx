'use client'
import useUserStore from '@/stores/useUserStore'

import React from 'react'

import StudentAccount from '@/components/dashboard/profile/student-account';
import AdminAccount from '@/components/dashboard/profile/admin-account';

const AccountPage = () => {
    const {user}=useUserStore()
    
 if(user?.type==='admin') {
  return <AdminAccount/>
}else {
  return <StudentAccount/>
}
}

export default AccountPage
