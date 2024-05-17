import React from 'react'
import Header from './module/Header'
import { Outlet } from 'react-router-dom'
import Footer from './module/Footer'

export default function Root() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
