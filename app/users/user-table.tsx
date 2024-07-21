import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { DialogHTMLAttributes, useRef, useState } from 'react'
import User from '../lib/type/User'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import ModalDelete from '@/components/ModalDelete'
import ModalEdit from '@/components/ModalEdit'

interface UserTableProps {
    users: User[],
    metadata: any,
    onPageChange: (page: number) => void,
    onLimitChange: (limit: number) => void,
    pageSelected: number
}

const UserTable = ({users,metadata, onPageChange, pageSelected, onLimitChange}: UserTableProps) => {
  const currentMetaData = metadata.current
  const LEFT_PAGINATION_MINIMUM: number = 3;
  const MAXIMUM_PAGINATION: number = 4;
  const MAX_OPTION: number = 50;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogEditRef = useRef<HTMLDialogElement>(null);
  const [userIdSelected, setUserIdSelected] = useState(0);
  const [userEdited, setUserEdited] = useState({id: '',name: '', email: ''})

  const renderPagination = () => {
    const pages = []
    
    if(currentMetaData.totalPages <= LEFT_PAGINATION_MINIMUM){
      for(let i = 1; i <= currentMetaData.totalPages; i++){
        pages.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink isActive={i === pageSelected} className={"isActive"}  onClick={() => {onPageChange(i)}}>{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }else{
      for(let i = 1; i <= LEFT_PAGINATION_MINIMUM; i++){
        pages.push(
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink isActive={i === pageSelected} className={"isActive"}  onClick={() => {onPageChange(i)}}>{i}</PaginationLink>
          </PaginationItem>
        );
      }

      //đoạn này để dịch chuyển số page
      //ví dụ như 1,2,3 ... 10 thì khi bấm từ số 3 trở đi nó sẽ lùi 1 page xuống đẩy 1 page lên và kết quả như sau
      // 2,3,4 ... 10
      if(pageSelected >= 3){
        pages.length = 0 //clear elements previous
        for(let i = pageSelected - 1; i <= pageSelected + 1;i++){
          pages.push(
            <PaginationItem key={i} className="cursor-pointer">
              <PaginationLink isActive={i === pageSelected} className={"isActive"}  onClick={() => {onPageChange(i)}}>{i}</PaginationLink>
            </PaginationItem>
          );
        }
      }

      //add ... to pagination
      pages.push(
        <PaginationItem key={"elips"}>
          <PaginationEllipsis/>
        </PaginationItem>
      )

      //add last page
      pages.push(
        <PaginationItem key={currentMetaData.totalPages} className="cursor-pointer">
          <PaginationLink isActive={currentMetaData.totalPages === pageSelected} className={"isActive"}  onClick={() => {onPageChange(currentMetaData.totalPages)}}>{currentMetaData.totalPages}</PaginationLink>
        </PaginationItem>
      )

      //display 4 lastest items
      if(currentMetaData.totalPages - pageSelected <= MAXIMUM_PAGINATION){
        pages.length = 0 //clear elements previous
        for(let i = currentMetaData.totalPages - MAXIMUM_PAGINATION; i < currentMetaData.totalPages + 1;i++){
          if(i == 0) //chỗ này để catch trường hợp page = 0, thì sẽ bỏ qua
            continue
          pages.push(
            <PaginationItem key={i} className="cursor-pointer">
              <PaginationLink isActive={i === pageSelected} className={"isActive"}  onClick={() => {onPageChange(i)}}>{i}</PaginationLink>
            </PaginationItem>
          );
        }
      }
      
    }
   
    return pages
  }

  const getOption = () => {
    const options = []

    for(let i: number = 5; i <= MAX_OPTION; i+=5){
      options.push(
        <option value={i} key={i}>{i}</option>
      )
    }
    
    return options;
  }

  const deletedUser = (id: number) => {
    setUserIdSelected(id)
    dialogRef.current?.showModal()
  }

  const editUser = (user: User) => {
    setUserEdited(user)
    dialogEditRef.current?.showModal()
  }

  return (
    <div>
      {/* 1 */}
      <div>Choose page limit: </div>
      <div> 
        <select name='selectedOption' onChange={(e)=> onLimitChange(Number(e.target.value))}>
          {getOption()}
        </select>
      </div>
      <ModalDelete dialogRef={dialogRef} id={userIdSelected} />
      <ModalEdit dialogEditRef={dialogEditRef} user={userEdited} />
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        
        <TableBody>
            {
                users.map((user: User)=>{
                    return (
                        <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                          <button className='btn' onClick={() => {editUser(user)}}>Edit</button>
                          <button className="btn" onClick={() => {deletedUser(Number(user.id))}}>Delete</button>
                        </TableCell> 
                        </TableRow>
                    )
                })
            }
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
           {
            pageSelected != 1 && 
            <PaginationItem className='cursor-pointer'>
              <PaginationPrevious  onClick={() => {onPageChange(pageSelected - 1)}}></PaginationPrevious>
            </PaginationItem>
           }
          {renderPagination()}
          {
            pageSelected != currentMetaData.totalPages &&
            <PaginationItem className='cursor-pointer'>
              <PaginationNext onClick={() => {onPageChange(pageSelected + 1)}}></PaginationNext>
            </PaginationItem>
          }
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default UserTable
