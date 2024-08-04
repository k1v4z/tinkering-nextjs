"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import User from '../lib/type/User'
import UserTable from './user-table';
import { useSearchParams, useRouter, redirect } from 'next/navigation';
import { getCookie, hasCookie } from 'cookies-next';
import { Divide } from 'lucide-react';

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
    const [entryUser, setEntryUser] = useState('')

    let pageSelected = pageSelectedRef.current
     useEffect(() => {
        //kiểm tra người dùng đã đăng nhập hay chưa bằng cách xem có access token trong cookie hay không
        //Nếu có thì redirect người dùng sang trang chủ 
        const checkCookie = async () => {
            const response = await fetch('http://localhost:3000/api/cookie',{
                method: "GET"
            }).then(res => res.json())
            
            //
            if(response.message == "Cookie don't existed"){
              router.push('/login')
            }
        }

        checkCookie()
    },[])


    useEffect(() =>{
        async function fetchingData(){
            const response = await fetch(`http://localhost:3000/api/users?limit=${limit}&page=${page}`);
            const { users, metadata, entryUser } = await response.json();
            setListUser(users)
            pageSelectedRef.current = page
            metaDataRef.current = metadata
            
            setEntryUser(entryUser)
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

    const handleLogout = async () => {
      // call api logout
      const res = await fetch('http://localhost:3000/api/logout',{
        method: "DELETE"
      })

      router.push('/login')
    }

  return (
    <ListUserContext.Provider value={{setListUser}}>
      <div>
        {!users ? (
          <div>Page not valid</div>
        ) : (
          <div>
            <div>Hello {entryUser}</div>
            <button onClick={() => handleLogout()}>Log out</button>
            <UserTable pageSelected={pageSelected} users={users} metadata={metaDataRef}
            onLimitChange={handleLimitChange} onPageChange={handlePageChange}></UserTable>
          </div>
        )}    
      </div>
    </ListUserContext.Provider>
  )
}

export default DemoPagination
