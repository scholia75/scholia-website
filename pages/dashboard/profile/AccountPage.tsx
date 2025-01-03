'use client'
import useUserStore from '@/stores/useUserStore'

import React from 'react'

import AdminAccount from '@/components/dashboard/profile/admin-account';
import StudentAccount from '@/components/dashboard/profile/student/student-account';

const AccountPage = () => {
    const {type}=useUserStore()
    
 if(type==='admin') {
  return <AdminAccount/>
}else {
  return <StudentAccount/>
}
}

export default AccountPage
