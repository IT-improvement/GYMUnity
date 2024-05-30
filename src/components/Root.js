import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from "@chakra-ui/react";
import Header from './module/Header'
import Footer from './module/Footer'

export default function Root() {
    return (
        <Box minW="80vw" maxW="80vw" m="0 auto" p="30px">
            <Header/>
            <Outlet/>
            <Footer/>
        </Box>
    );
}