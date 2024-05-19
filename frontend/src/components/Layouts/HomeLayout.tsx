import React from 'react'
import Header from '../organisms/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../organisms/Footer/Footer'

const HomeLayout:React.FC = () => {
  return (
    <>
     <Header />
     <Outlet />
     <Footer /> 
    </>
  )
}

export default HomeLayout
