import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Grid, VStack, Avatar, AvatarGroup, Card, CardBody, Box, Heading, Text, Spinner } from "@chakra-ui/react";

const UserList = ({ searchQuery }) => {
    const [isFetching, setIsFetching] = useState(true);
    const [users, setUsers] = useState([]);

    const fetchUsers = () => { 
        let apiPath = "user?command=read_all";

        if (searchQuery)
            apiPath = `user?command=read_all_by_query&query=${searchQuery}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/${apiPath}`)
        .then(response => response.json())
        .then(data =>  {
            setUsers(data);
        })
        .catch(err => {
        })
        .finally(() => {
            setIsFetching(false);
        });
    };

    const showUsers = () => {
        const userCards = users.map(({code, id, name}, index) => {
            return (
                <Card key={index}>
                    <CardBody>
                        <Box p="10px" borderRadius="10px" bgColor="gray.200" cursor="pointer"
                            _hover={{backgroundColor: "gray.500"}}
                            >
                            <Link to={`/user/${code}`}>
                                <Flex direction="column" align="center">
                                    <Avatar src='' size="2xl" />
                                    <VStack gap="10px">
                                        <Text>{id}</Text>
                                        <Text>{name}</Text>
                                    </VStack>
                                </Flex>
                            </Link>
                        </Box>
                    </CardBody>
                </Card>
            );
        });

        return (
            <Flex width="100%" direction="column" p="10px" bgColor="gray.300" gap="10px">
                <Grid gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="300px" overflow="hidden" height="calc(150px * 2 + 10px)" width="100%" gap="10px">
                    {userCards}
                </Grid>
                <Flex justify="right">
                    <Link float="right" to="/users">
                        <Box p="10px" bgColor="gray.200" borderRadius="10px">
                            <AvatarGroup size="md" max={2}>
                                <Avatar src="" />
                                <Avatar src="" />
                                <Avatar src="" />
                                <Avatar src="" />
                            </AvatarGroup>
                        </Box>
                    </Link>
                </Flex>
            </Flex>
        );
    };

    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);

    return (
        <Flex direction="column" gap="10px">
            <Heading>유저목록</Heading>
            { isFetching && <Spinner/> }
            {users.length > 0 ? showUsers() : <Heading fontSize="20px">유저가 없습니다</Heading> }
        </Flex>
    );
};

export default UserList;