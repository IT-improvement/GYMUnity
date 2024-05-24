import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './module/Footer'
import Header from './module/header'

export default function Root() {
    return (
        <>  
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
