import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { VStack, Grid, Avatar, Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Context from "../../Context";

const FriendList = ({ shouldFetch }) => {
    const [isFetching, setIsFetching] = useState(true);
    const [friends, setFriends] = useState([]);
    const { userCode } = useContext(Context);
    
    const fetchFriends = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=read_all`, {
            method: "GET", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(response => response.json())
        .then(data => {
            setFriends(data);
        })
        .catch(err => {
        })
        .finally(() => {
            setIsFetching(false);
        });
    };

    const showFriends = () => {
        return (
            friends.map(({userCode, userId, userName}, index) => {
                return (
                <Card key={index}>
                    <CardBody>
                        <Link to={`/user/${userCode}`}>
                            <Box p="10px" borderRadius="10px" bgColor="gray.300" cursor="pointer" _hover={{backgroundColor: "gray.400"}}>
                                <Avatar src='' size="2xl"/>
                                <VStack gap="10px">
                                    <Text>{userId}</Text>
                                    <Text>{userName}</Text>
                                </VStack>
                            </Box>
                        </Link>
                    </CardBody>
                </Card>
                );
            })
        );
    };
    
    useEffect(() => {
        if (shouldFetch)
            fetchFriends();
    }, [shouldFetch]);

    return (
        <VStack width="100%" p="10px" gap="30px">
            <Heading>친구목록</Heading>
            <LoadingSpinner isLoading={isFetching} />
            {friends.length > 0 ? 
                <Grid templateColumns="repeat(4, 1fr)" gap="10px">
                    {showFriends()}
                </Grid> 
                :
                <Heading as="h3" mt="50px" fontSize="20px" textAlign="center">친구목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FriendList;