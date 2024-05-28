import { Flex, VStack, Box, Heading, Input, Button, Text } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const Sidebar = () => {
    const menuItems = [
        { 
            name: "게시글",
            link: "/",
        },
        { 
            name: "친구 목록",
            link: "/friends",
        },
        { 
            name: "친구 요청 목록",
            link: "/friends/requests",
        },
        { 
            name: "운동법",
            link: "/exercises",
        },
    ];

    return (
        <VStack minW="200px" p="10px" bgColor="gray.300" >
            {menuItems.map(item => {
                return (
                    <Box key={item.link} w="100%" textAlign="center" p="10px" bgColor="gray.400">
                        <Link to={item.link}><Text>{item.name}</Text></Link>
                    </Box>
                );
            })}
        </VStack>
    );
};

export default Sidebar;