"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const router = useRouter();
    
    const handleRegister = async() =>{
        //làm dự án validate thêm username lớn hơn 6 kí tự nữa nhé
        if(password !== repassword){
            toast.error("Mật khẩu không khớp",{
                position: "top-right"
            })
        }else{
            // call api register
            const response = await fetch('http://localhost:3000/api/register',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,password})
            }).then(res => res.json())
            
            toast(response.message,{
                position: "top-right",
                autoClose: 3000
            })
            
            //đẩy người dùng qua trang login sau 3s nếu đăng kí thành công
            if(response.message === 'Đăng kí thành công'){ //check bằng status code thì hay hơn
                setInterval(() =>{
                    router.push('/login')
                    clearInterval(this)
                },3000)
            }
        }
    }

  return (
    <div>
    <ToastContainer/>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-700">Login</h1>
            <form className="space-y-4">
                <div>
                    <label className="label">
                        <span className="text-base label-text">User name</span>
                    </label>
                    <input onChange={(e) => {setUserName(e.target.value)}} type="text" placeholder="Enter User name" className="w-full input input-bordered" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Enter Password" className="w-full input input-bordered" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input onChange={(e) => {setRepassword(e.target.value)}} type="password" placeholder="ReEnter Password" className="w-full input input-bordered" />
                </div>
                <div>
                    <button type='button' onClick={() => {handleRegister()}} className="btn-neutral btn btn-block">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Register
