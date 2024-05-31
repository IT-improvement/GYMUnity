import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from "@chakra-ui/react";
import Header from './module/Header'
import Footer from './module/footer';

export default function Root() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}