import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './module/header'
import Footer from './module/footer'

export default function Root() {
    return (
        <>  
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
