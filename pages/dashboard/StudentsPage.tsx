'use client'
import StudentsTable from '@/components/dashboard/students/students-table'
import { Card } from '@nextui-org/react'
import React from 'react'

const StudentsPage = () => {
  return (
    <Card className='p-3'>
         <StudentsTable/>
    </Card>
  )
}

export default StudentsPage
