import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, VStack, HStack, Grid, Image, Box, Button, Heading, Text } from "@chakra-ui/react";

const UserList = ({ searchQuery }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => { 
        let searchUrl = "user?command=read_all";

        if (searchQuery)
            searchUrl = `user?command=read_all_by_query&query=${searchQuery}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/${searchUrl}`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(err => {
                return;
        });
    };

    const showUsers = () => {
        return (
            users.map(({code, id, name}, index) => {
                return (
                    <Link to={`/user/${code}`} key={index}>
                        <Box p="10px" borderRadius="10px" bgColor="gray.300" cursor="pointer" _hover={{backgroundColor: "gray.400"}}>
                            <Image src={`${process.env.PUBLIC_URL}/images/user_profile_default.png`}
                                w="150px" borderRadius="50%"
                            />
                            <VStack gap="10px">
                                <Text>{id}</Text>
                                <Text>{name}</Text>
                            </VStack>
                        </Box>
                    </Link>
                );
            })
        );
    };

    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);

    return (
        <Flex>
            {users.length > 0 ? showUsers() : <Heading>유저가 없습니다</Heading> }
        </Flex>
    );
};

export default UserList;