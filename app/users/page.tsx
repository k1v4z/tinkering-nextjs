"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import User from '../lib/type/User'
import UserTable from './user-table';
import { useSearchParams, useRouter } from 'next/navigation';

interface ListUserContextType{
  setListUser: React.Dispatch<React.SetStateAction<User[]>>;
}

export const ListUserContext = createContext<ListUserContextType | null>(null)


const DemoPagination = () => {
    const [users, setListUser] = useState<User[]>([]); 
    
    const metaDataRef = useRef({totalPages: 0, limit: 0, totalUser: 0})
    const pageSelectedRef = useRef<number>(1); //default 1
    const searchParams = useSearchParams()
    const router = useRouter()
    const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 10)
    const page = Number(searchParams.get('page'))
    //chan o client
    //lam 1 cai combobox de chon limit
    //chia ra các kho nhỏ sau đó gộp thành kho lớn rồi import
    let pageSelected = pageSelectedRef.current

    useEffect(() =>{
        async function fetchingData(){
            const response = await fetch(`http://localhost:3000/api/users?limit=${limit}&page=${page}`);
            const { users, metadata } = await response.json();
            setListUser(users)
            pageSelectedRef.current = page
            metaDataRef.current = metadata
        }

        fetchingData()
    },[limit,page])

    
    const handlePageChange = (currentPage: number) =>{
      pageSelectedRef.current = currentPage
      router.push(`/users?limit=${limit}&page=${currentPage}`)
    }

    const handleLimitChange = (limitChange: number) =>{
      setLimit(limitChange)
      router.push(`/users?limit=${limitChange}&page=${page}`)
    }

  return (
    <ListUserContext.Provider value={{setListUser}}>
      <div>
        {!users ? (
          <div>Page not valid</div>
        ) : (
          <UserTable pageSelected={pageSelected} users={users} metadata={metaDataRef}
          onLimitChange={handleLimitChange} onPageChange={handlePageChange}></UserTable>
        )}    
      </div>
    </ListUserContext.Provider>
  )
}

export default DemoPagination
