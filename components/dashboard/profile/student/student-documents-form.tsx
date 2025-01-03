import FileUploader from '@/components/ui/FileUploader'
import { Card } from '@nextui-org/react'
import React from 'react'

const StudentDocumentsForm = ({studentId}:{studentId:string}) => {
  
  return (
   <div className='grid max-md:grid-cols-1 grid-cols-2 gap-2'>
     <Card className='p-3'>
    <FileUploader title='Passport' type='passport' studentId={studentId}/>
    </Card>

    <Card className='p-3'>
    <FileUploader title='Diplôme du Bac' type='bac' studentId={studentId}/>
    </Card>

    <Card className='p-3'>
    <FileUploader title='Justificatif de niveau de langue française' type='language' studentId={studentId}/>
    </Card>

    <Card className='p-3'>
    <FileUploader title='Curriculum Vitae (CV) à jour' type='cv' studentId={studentId}/>
    </Card>
   </div>
  )
}

export default StudentDocumentsForm
