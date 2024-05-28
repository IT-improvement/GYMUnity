import React from 'react'
import Header from './module/Header'
import { Outlet } from 'react-router-dom'
import Footer from './module/Footer'
import { Box } from "@chakra-ui/react";

export default function Root() {
    return (
        <Box minW="80vw" m="0 auto" p="30px">
            <Header/>
            <Outlet/>
            <Footer/>
        </Box>
    )
}