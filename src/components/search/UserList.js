import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarGroup, Badge, Card, CardBody, Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import LoadingSpinner from "../chakra/LoadingSpinner";

const UserList = ({ searchQuery, isTotalSearch }) => {
    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [userLimit] = useState(4);
    const navigate = useNavigate();

    const fetchUsers = () => { 
        let params = searchQuery ?
            `command=read_all_by_query&query=${searchQuery}` :
            `command=read_all`;

        if (isTotalSearch)
            params += `&limit=${userLimit}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/user?${params}`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .finally(() => {
            setIsFetching(false);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, [searchQuery, isTotalSearch]);

    const showAvatar = () => {
        const avatars = [];

        for (let i = 0; i < users.length; i++)
            avatars.push(<Avatar key={`user_image_${i}`} src="" />);

        return avatars;
    };

    const showUserMoreSection = () => {
        return (
            <Flex justify="right">
                <Box p="10px" textAlign="center" bgColor="gray.200" borderRadius="10px"
                    cursor="pointer"
                    onClick={() => navigate("/search", { state: { searchQuery: searchQuery, category: "user" }})} >
                        {users.length >= userLimit &&
                        <>
                            <AvatarGroup size="md" max={userLimit}>
                                {showAvatar()}
                            </AvatarGroup>
                            <Text color="gray.600">유저 더보기</Text>
                        </>
                        }
                </Box>
            </Flex>
        );
    };

    const showUsers = () => {
        return (
            users.map(({code, id, name}) =>
                <Card key={code}>
                    <CardBody>
                        <Box p="10px" bgColor="gray.200" borderRadius="10px"
                            cursor="pointer"
                            _hover={{backgroundColor: "gray.500"}} >
                            <Link to={`/user/${code}`}>
                                <Flex direction="column" align="center" gap="10px">
                                    <Avatar src="" size="2xl" />
                                    <VStack gap="10px">
                                        <Text>{name}</Text>
                                        <Badge fontSize="15px" colorScheme="pink">
                                            {id}
                                        </Badge>
                                    </VStack>
                                </Flex>
                            </Link>
                        </Box>
                    </CardBody>
                </Card>
            )
        );
    };

    return (
        <Flex direction="column" p="10px" gap="10px" bgColor="gray.300" borderRadius="10px">
            <Heading>유저목록</Heading>
            { isFetching && <LoadingSpinner /> }
            { users.length > 0 ? 
                <Flex direction="column" w="100%" p="10px" gap="10px">
                    <Grid gridTemplateColumns={`repeat(${userLimit}, 1fr)`}
                        w="100%" gap="10px" overflow="hidden">
                        { showUsers() }
                    </Grid>
                    { isTotalSearch && (users.length >= userLimit) && showUserMoreSection() }
                </Flex>
                :
                <Heading fontSize="20px">유저가 없습니다</Heading>
            }
        </Flex>
    );
};

export default UserList;