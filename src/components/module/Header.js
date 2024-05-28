import { Flex, Box, Heading, Input, Button, Text } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react'
import { Context } from "../../App";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
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
                    </Flex>
                </Heading>
            </Box>
        </>
    );
}