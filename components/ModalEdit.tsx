import User from '@/app/lib/type/User'
import { ListUserContext } from '@/app/users/page'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

interface ModalEditProps {
    user: User,
    dialogEditRef: any
}

const ModalEdit = ({user,dialogEditRef}: ModalEditProps) => {
    const searchParams = useSearchParams();
    const context = useContext(ListUserContext)
    const [inputFieldName, setInputFieldName] = useState(user.name);
    const [inputFieldEmail, setInputFieldEmail] = useState(user.email);
    const [messageError, setMessageError] = useState([]);
    
    useEffect(() => {
        //user init when component first rendered 
        setInputFieldName(user.name);
        setInputFieldEmail(user.email);
    },[user])

    useEffect(() => {
        if(messageError.length != 0){
            messageError.forEach((message) => {
                toast.error(message,{
                    position: "top-right"
                });
            })
        }
    },[messageError])

    if(!context){
        return null
    }
  
    const { setListUser} = context

    const editUser = async(user: User) => {
        const limit = searchParams.get('limit')
        const page = searchParams.get('page')

        try{
            const res = await fetch(`http://localhost:3000/api/users/${user.id}`,{
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...user, name: inputFieldName, email: inputFieldEmail })
            }).then(res => res.json())
            
            const {error} = res

            if(error){
                const {issues} = error
                const messages = issues.map((issue: any) => issue.message)
                setMessageError(messages)
            }else{
                //call api to update list user
                const response = await fetch(`http://localhost:3000/api/users?limit=${limit}&page=${page}`);
                const { users } = await response.json();
                
                setListUser(users);
            }
        }catch(error){
            console.log(error);
        }
        
        //close dialog
        dialogEditRef.current?.close()
    }
  return (
    <div>
        <ToastContainer/>
      {/* Put this part before </body> tag */}
        <dialog ref={dialogEditRef} id="my_modal_1" className="modal">
        
        <div className="modal-box">
            <h3 className="font-bold text-lg">Edit user: {user.id}</h3>
            <input onChange={(e) => {setInputFieldName(e.target.value)}} type="text" placeholder="Type here" className="input w-full max-w-xs" value={inputFieldName} />
            <input onChange={(e) => {setInputFieldEmail(e.target.value)}} type="text" placeholder="Type here" className="input w-full max-w-xs"value={inputFieldEmail} />
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Cancel</button>
            </form>
            <button onClick={() => {
                editUser(user)
            }}>Save</button>
            </div>
        </div>

        </dialog>
        
    </div>
  )
}

export default ModalEdit
