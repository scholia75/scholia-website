'use client'
import StatisticsPage from '@/pages/dashboard/StatisticsPage'
import useUserStore from '@/stores/useUserStore'
import React from 'react'
import StudentDocumentsForm from '@/components/dashboard/profile/student/student-documents-form'

const Home = () => {
  const {type,student}=useUserStore()
  if(type==='admin') {return <StatisticsPage/>}
  else if(type==='student'){
    return <StudentDocumentsForm studentId={student.id}/>
  }
}

export default Home
