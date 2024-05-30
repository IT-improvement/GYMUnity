import {  VStack, Box, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const Sidebar = () => {
    const menuItems = [
        { 
            name: "게시글",
            link: "/",
        },
        {
            name: "피드",
            link: "/feed",
        },
        {
            name: "다이어리",
            link: "/diary",
        },
        {
            name: "루틴",
            link: "/diet",
        },
        { 
            name: "친구 목록",
            link: "/",
        },
        {
            name: "친구신청",
            link: "/",
        },
        {
            name: "마이페이지",
            link: "/user/mypage",
        }
    ];

    return (
        <VStack minW="200px" p="10px" bgColor="gray.300" >
            {menuItems.map(item => {
                return (
                    <Box key={item.link} w="100%" textAlign="center" p="10px"
                        bgColor="gray.400" _hover={{ bgColor: "gray.500" }}
                    >
                        <Link to={item.link}><Text>{item.name}</Text></Link>
                    </Box>
                );
            })}
        </VStack>
    );
};

export default Sidebar;