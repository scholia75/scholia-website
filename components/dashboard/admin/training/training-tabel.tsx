'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Input,
} from '@nextui-org/react';
import {
    Button,
  } from "@nextui-org/react";
import { TrainingType } from '@/types';
import { getAllTraining, searchTraining } from '@/actions/admin/trainings';
import { Icon } from '@iconify/react/dist/iconify.js';
import TrainingModal from './training-modal';
import { levels } from '@/constants';
import { ID } from 'appwrite';
import useTrainingStore from '@/stores/useTrainingStore';
import TrainingDropdown from './training-dropdown';

export const columns = [
  { name: 'Nom court', uid: 'shortName' },
  { name: 'Nom long', uid: 'longName' },
  { name: 'Niveau', uid: 'level' },
  { name: "", uid: "actions" },
];

const TrainingTable = () => {

  const {trainingList,setTrainingList}=useTrainingStore()
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const [openTrainingModal, setOpenTrainingModal] = useState(false)
  const rowsPerPage = 10;

 

  const pages = useMemo(() => (total ? Math.ceil(total / rowsPerPage) : 0), [total, rowsPerPage]);


  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = filterValue.trim()
        ? await searchTraining(filterValue, rowsPerPage, page)
        : await getAllTraining(rowsPerPage, page);

      const { trainingList, total } = data;
      setTrainingList(trainingList || []);
      setTotal(total || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [filterValue, page, rowsPerPage]);

  const onSearchChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      setPage(1); // Reset to the first page on a new search
    },
    []
  );

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1); // Reset to the first page when clearing
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const renderCell = useCallback(
    (training: TrainingType, columnKey: keyof TrainingType | 'actions') => {
      const cellValue = training[columnKey as keyof TrainingType];
      const levelData=levels.find(level=>level.id===training.level)
      switch (columnKey) {
        case 'shortName':
          return <p className="text-bold capitalize">{training.shortName}</p>;
        case 'longName':
          return <p className="text-bold capitalize">{training.longName}</p>;
        case 'level':
          return <p className="text-bold capitalize">{`RNCP Niveau ${levelData?.number} - Bac +${levelData?.bac}`}</p>;
        case 'actions':
          return (
            <>
            <TrainingDropdown training={training}/>
            </>
           
          )
          
          ;
        default:
          return <p>{cellValue as string}</p>;
      }
    },
    []
  );

  return (
    <>
      <TrainingModal 
       isOpen={openTrainingModal}
       onOpen={setOpenTrainingModal}
       training={{
       id:ID.unique(),
       shortName:'',
       longName:'',
       level:1
       }}/>

   
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Recherche..."
          startContent={<Icon icon={'iconoir:search'} className="text-default-400 size-4" />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
         <Button color="primary" onPress={()=>setOpenTrainingModal(true)} size="lg" className="font-medium">
          Ajouter
        </Button>
      
      </div>
      <Table
        aria-label="Training table"
        bottomContent={
          pages > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          )
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="Aucune ligne à afficher."
          loadingContent={<Spinner />}
         
          items={trainingList}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof TrainingType)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </>
  );
};

export default TrainingTable;
