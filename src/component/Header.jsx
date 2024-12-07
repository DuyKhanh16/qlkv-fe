import React, { useState } from 'react'
import logo from "../assets/logo.png"
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
export default function Header(props) {
  const [checkOut,setCheckOut] = useState(false)
  

  const handleLogout = () => {
    if(window.confirm("Bạn có muốn đăng xuất không ?")){
      Cookies.remove("token");
      Cookies.remove("loginData");    
      window.location.href = "/login";
  }else{
    setCheckOut(!checkOut)
  }
  
}
  return (
    <div className='flex justify-between border-b shadow-xl'>
      <div className='w-[200px] ' ><img src={logo} /></div>
      <h2 className='text-4xl font-bold text-red-600   pt-[33px] '>Phần mềm quản lý khoản vay</h2>
     <div className='mt-[40px]'>
     <div className='flex gap-2 items-center mr-2'>
        <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" width={40} alt="" />
        <span className='font-bold text-blue-500 hover:text-red-600 cursor-pointer' onClick={()=>setCheckOut(!checkOut)}>Xin chào: {props.user.fullName}</span>
      </div>
      <div className='ml-[50px] mt-[-10px]'>
      <Button className='hover:text-red-600 ' style={{display:checkOut ? "block" : "none"}} onClick={handleLogout} >Đăng xuất</Button>
      </div>
     </div>
    </div>
  )
}
