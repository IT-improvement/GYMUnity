import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './module/Footer'
import { Box } from "@chakra-ui/react";
import Header from './module/header'

export default function Root() {
    return (
        <Box minW="80vw" m="0 auto" p="30px">
            <Header/>
            <Outlet/>
            <Footer/>
        </Box>
    )
}