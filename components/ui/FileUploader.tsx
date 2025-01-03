'use client'
import { deleteDocument, getDocument, uploadDocument } from '@/actions/student';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Chip } from '@nextui-org/react'
import React, { ChangeEvent, DragEvent,  useEffect,  useState } from 'react'
import {Progress} from "@nextui-org/react";
import { DocumentType, FileType } from '@/types';
import {Alert} from "@nextui-org/react";

const FileUploader = ({title,studentId,type}:{title:string,studentId:string | undefined,type:DocumentType}) => {
    
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState<FileType | null | undefined>();
   
   const [isLoading, setIsLoading] = useState(false)

   
   const uplaodFile=async(file:File | undefined)=>{

      if(file && studentId){
        setIsLoading(true)
        setProgress(0);
        try {
            const interval = setInterval(() => {
                setProgress((prev) => {
                  const nextProgress = prev + 10;
                  if (nextProgress >= 90) {
                    clearInterval(interval);
                  }
                  return nextProgress;
                });
              }, 500);

            const data=await uploadDocument(file,studentId,type)
            setFile(data)
            setProgress(100);
         } catch (error) {
            console.log(error)
         }finally{
            setIsLoading(false)
         }
      }else{
        console.log('no file')
      }
   }
  const handleFileChange = async(event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    await uplaodFile(selectedFile)
 
   
  };

const handleClearFile=async()=>{
    if(file){
        try {
            setFile(null);
            await deleteDocument(file.id)
         } catch (error) {
            console.log(error)
         }
    }
   
}
  
  const handleDrop = async(event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    await uplaodFile(droppedFile)
    
   
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
     const fetchFile=async()=>{
            if(studentId){
                try {
                 const data=await getDocument(studentId,type)
                 setFile(data)
                } catch (error) {
                  console.log(error)
                }
            }
     }
  
    fetchFile()

  }, [studentId])
  
    return (
       <div className='space-y-2'>
          <h2 className="text-xl font-medium">{title}</h2>
        <p className='text-default-500'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente excepturi sit beatae nobis
        </p>
      

        {!file && !isLoading ?
          <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full p-3 space-y-2 border-2 border-dashed border-default-300 rounded-lg flex flex-col items-center justify-center  transition duration-200 cursor-pointer"
        >

            <Icon icon={'mdi-light:cloud-upload'} className='size-10'/>
        <div>
        <h4 className="text-large font-medium text-center">Faites glisser le fichier ici</h4>
        <p className='text-default-500 text-center'>Accepter 1 seul fichier PDF</p>
            </div>
          <p className="text-default-500 text-large relative or">Ou </p>
          
          <Button variant='bordered' color='primary'>
          Parcourir le fichier
          </Button>
          <input
            type="file"
             accept="application/pdf"
            onChange={handleFileChange}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>:
        isLoading && !file?
        <Progress
      aria-label="Downloading..."
      className="w-full py-3"
      color="primary"
      showValueLabel={true}
      size="md"
      value={progress}
    />
       :!isLoading && file &&
        (
            <div className='border  rounded-lg p-3 flex flex-row '>
                   <Icon icon={'prime:file-pdf'} className='size-10'/>

              <div className='flex-1 space-y-1'>
             
            <div className='w-full flex justify-between items-start'>
         <div>
         <span className="font-medium text-sm">{file.fileName}</span>
         <p className='text-default-500 text-small'>{file.size} KB</p>
         </div>
              <button onClick={handleClearFile}>
                <Icon icon={'mynaui:trash'} className='size-6 text-danger'/>
            </button>
            </div>
             

              <div className='w-full flex justify-between'>
              <a href={file.fileUrl} className='text-primary cursor-pointer font-medium' >
            Voir le fichier
            </a>
            <Chip color={file.status==='valide'?'success':file.status==='invalide'?'danger':"warning"} variant="bordered">
           {file.status}
      </Chip>
           
             </div>
           
                </div>
               

            </div>
          
        )}
{
    file?.note && 
    <Alert
    color="warning"
    variant='bordered'
    title={file?.note}
  
  />
}


       </div>
    );
}

export default FileUploader
