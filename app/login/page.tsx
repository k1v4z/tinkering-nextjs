"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"

//import CryptoJS from 'crypto-js'

const secretKey = 'k1v4zz-secretkey' //làm dự án  ko để đây nhé :v

const Login = () => {
    const [response, setResponse] = useState(null)
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    // const encryptData = (data: any) => {
    //     return CryptoJS.AES.encrypt(JSON.stringify(data),secretKey).toString();
    // }

    useEffect(() => {
        //kiểm tra người dùng đã đăng nhập hay chưa bằng cách xem có access token trong cookie hay không
        //Nếu có thì redirect người dùng sang trang chủ 
        const checkCookie = async () => {
            const response = await fetch('http://localhost:3000/api/cookie',{
                method: "GET"
            }).then(res => res.json())

            console.log(response.message);
            
            //mục đích là tránh trường hợp người dùng đã login rồi nhưng vẫn vào lại endpoint login
            //Nên ta check thử xem đăng nhập chưa rồi redirect luôn
            if(response.message === 'Cookie existed'){
                router.push('/users?limit=10&page=1') //thực tế thì redirect tới thẳng homepage luôn
            }
        }

        checkCookie()
    },[])

    const handleLogin = async () =>{
        
        //send data user to server
        const res = await fetch('http://localhost:3000/api/login',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(response => response.json())

        const {accessToken, refreshToken} = res
        

        if(accessToken){ //Nếu đã đăng nhập 
            router.push('/users?limit=10&page=1') //thực tế thì redirect tới thẳng homepage luôn
        }else{
            toast.error(res.message)
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
                <a href="/register" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Sign up now</a>
                <div>
                    <button type='button' onClick={() => {handleLogin()}} className="btn-neutral btn btn-block">Login</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login
