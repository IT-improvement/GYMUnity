import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Avatar, Text, Stack, Flex } from "@chakra-ui/react";

const UserProfile = () => {
    const { code } = useParams();
    const [user, setUser] = useState(true);

    useEffect(() => {
        console.log(code);
        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=read_one&code=${code}`)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                return response.json();
            })
            .then(data => {
                setUser(data)
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [code]);

    if (!user) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <Flex justify="center">
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" textAlign="center" mx="auto" overflow="hidden">
            <Box p="6" textAlign="center">
                    <Avatar src={user.profileImage} size="xl" width="150px" height="150px" mx="auto" alt={user.name} />
                        <Stack spacing="1">
                            <Text fontWeight="bold">아이디</Text>
                            <Text>{user.id}</Text>
                        </Stack>
                        <Stack spacing="1">
                            <Text fontWeight="bold">이름</Text>
                            <Text>{user.name}</Text>
                        </Stack>
                    </Box>
                {/* <Flex justify="center">
                    
                </Flex> */}
            </Box>
            </Flex>
            
        </div>
    );

};

export default UserProfile;