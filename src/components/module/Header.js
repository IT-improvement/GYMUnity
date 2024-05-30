import { Flex, Box, Heading, Input, Button, Text, Avatar } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react'
import { Context } from "../../App";
import React from "react";
import Context from "../../Context";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const { isLoggedIn, setIsLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    const handleSearchButtonOnClick = () => {
        navigate("/search", { state: { searchQuery: searchQuery }});
    };

    return (
        <>
            <Box>
                <Heading>
                    {process.env.REACT_APP_SERVER_URL}
                    <Flex gap="10px" align="center">
                    <Box maxW="300px" minW="200px">
                        <Link to="/">
                            <Text as="h1" fontSize="4xl" p="10px" color="var(--blue)">GymUnity</Text>
                        </Link>
                    </Box>
                    <Input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                    <Button onClick={handleSearchButtonOnClick}>&#x1F50D;</Button>
                    <Button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                        {isLoggedIn ?
                            <Avatar src='' size="sm" />
                            : "로그인하기"
                        }
                    </Button>
                    </Flex>
                </Heading>
            </Box>
        </>
    );
}
