'use client'

import TrainingTable from '@/components/dashboard/admin/training/training-tabel'
import { Card } from '@nextui-org/react'
import React from 'react'

const TrainingPage = () => {
  return (
    <Card className='p-3'>
       <TrainingTable/>
    </Card>
  )
}

export default TrainingPage
