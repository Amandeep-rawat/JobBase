import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
const AppLayout = () => {
  return (
    <div>

      <div className="grid-background "></div>
      <main className='min-h-screen container m-auto'>

      <Header/>
        <Outlet/>

      </main>
    <Footer/>
    </div>
  )
}

export default AppLayout