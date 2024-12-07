import React from 'react'
import Fotter from '../Fotter'
import Header from '../Header'
import Cookies from 'js-cookie'
import Nav from '../Nav';
import { Outlet } from 'react-router-dom';
import Body from '../Body';

export default function Home() {
  const currentUser = JSON.parse(Cookies.get("loginData"));
  return (
    <div >
      <Header user={currentUser}/>
{/* <div className='flex'>
  <Nav></Nav>
  <div className='w-[calc(100%-200px)] p-2'>
    <Outlet></Outlet>
  </div>
</div> */}
    <Body></Body>
     <Fotter />
    </div>
  )
}
