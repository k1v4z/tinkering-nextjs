"use client"
import User from '@/app/lib/type/User'
import { ListUserContext } from '@/app/users/page'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import React, { DialogHTMLAttributes, useContext, useRef } from 'react'

interface ModalDeleteProps {
  id: number,
  dialogRef: any
}

const ModalDelete = ({id,dialogRef}: ModalDeleteProps) => {
  const searchParams = useSearchParams();
  const context = useContext(ListUserContext)
  if(!context){
    return null
  }

  const { setListUser} = context

  const deleteUser = async(id: number) => {
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')

    try{
      await fetch(`http://localhost:3000/api/users/${id}`,{
        method: "DELETE"
      })
      //gọi api để update lại list user
      const response = await fetch(`http://localhost:3000/api/users?limit=${limit}&page=${page}`);
      const { users } = await response.json();
      setListUser(users);
    }catch(error){
      console.log(error);
    }

    //close dialog
    dialogRef.current?.close()
  }

  return (
    <div>
      <dialog ref={dialogRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Warning!</h3>
            <p className="py-4">Do you want to delete user have id: {id} </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">No</button>
              </form>
              <button onClick={() => {deleteUser(id)}}>Yes</button>
            </div>
          </div>
      </dialog>
    </div>
  )
}

export default ModalDelete
