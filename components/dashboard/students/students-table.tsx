'use client'
import React, {useCallback, useEffect, useMemo, useState } from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
   
    Pagination,
    Spinner,
  } from "@nextui-org/react";
import { StudnetType } from '@/types';
import useUserStore from '@/stores/useUserStore';
import { getAllStudents } from '@/actions/admin';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
 
  export const columns = [
    {name: "Nom", uid: "firstname"},
    {name: "Prénom", uid: "lastname"},
    {name: "Date de naissance", uid: "birthdate"},
    {name: "Pays de naissance", uid: "birthcountry"},
    {name: "Pays de résidence", uid: "residancecountry"},
    {name: "Téléphone", uid: "phone"},
    { name: "Actes", uid: "actions" },
  ];

const StudentsTable = () => {
    const [students, setStudents] = useState<StudnetType[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const rowsPerPage = 10;

    const pages = useMemo(() => {
        return total ? Math.ceil(total/ rowsPerPage) : 0;
      }, [total, rowsPerPage]);

      const loadingState = isLoading || students.length === 0 ? "loading" : "idle";
    const {user}=useUserStore()
    const router=useRouter()
    const renderCell = useCallback(
        (student: StudnetType, columnKey: keyof StudnetType | "actions") => {
            const cellValue = student[columnKey as keyof StudnetType];

    switch (columnKey) {
      case "firstname":
        return <p className="text-bold capitalize">{student.firstname}</p>;
      case "lastname":
        return <p className="text-bold  capitalize">{student.lastname}</p>;
        case "birthdate":
            return <p className="text-bold  capitalize">{student.birthdate.toString()}</p>;
        case "birthcountry":
            return <p className="text-bold capitalize">{student.birthcountry}</p>;
        case "residancecountry":
            return <p className="text-bold  capitalize">{student.residancecountry}</p>;
        case "phone":
                return <p className="text-bold  capitalize">{student.phone}</p>;
        case "actions":
                    return (
                        <button className="relative flex items-center gap-2" onClick={()=>router.push('/dashboard/students/'+student.id)}>
                           
                            <Icon icon={'iconamoon:eye-light'} className='text-default-400 size-6'/>
                        </button>
                    );
      default:
        return <p>{cellValue as string}</p>; // Ensure safe rendering
    }
  }, [router]);
      useEffect(() => {
         const fetchStudents=async()=>{
            setIsLoading(true)
          

            try {
             
                if(user?.type==='admin'){
                const data=await getAllStudents(rowsPerPage,page)
                const {students,total}=data
                setStudents(students)
                setTotal(total)
            }else{

            }
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false)
            }
           
         }

         fetchStudents()
      }, [user,page])
      
  return (
    <Table 
    aria-label="Example table with dynamic content"
    bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page:number) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
    <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody    loadingContent={<Spinner />}  loadingState={loadingState} items={students}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey as keyof StudnetType | "actions")}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
  </Table>
  )
}

export default StudentsTable
