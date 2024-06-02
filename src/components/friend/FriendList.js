import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Card, CardBody, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import Context from "../../Context";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Toast from "../chakra/Toast";

const FriendList = ({ shouldFetch }) => {
    const [friends, setFriends] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const { sessionUser } = useContext(Context);
    
    const fetchFriends = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=read_all`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then(data => setFriends(data))
        .catch(() => Toast.showFailed("친구목록 불러오기 실패"))
        .finally(() => {
            setIsFetching(false);
        });
    };

    useEffect(() => {
        if (shouldFetch)
            fetchFriends();
    }, [shouldFetch]);

    const showFriends = () => {
        return (
            friends.map(({userCode, userId, userName}, index) =>
                <Card key={index}>
                    <CardBody>
                        <Link to={`/user/${userCode}`}>
                            <Box p="10px" borderRadius="10px" bgColor="gray.300" cursor="pointer"
                            _hover={{backgroundColor: "gray.400"}}>
                                <Avatar src="" size="2xl"/>
                                <VStack gap="10px">
                                    <Text>{userId}</Text>
                                    <Text>{userName}</Text>
                                </VStack>
                            </Box>
                        </Link>
                    </CardBody>
                </Card>
            )
        );
    };
    
    return (
        <VStack w="100%" p="10px" gap="30px">
            <Heading>친구목록</Heading>
            <LoadingSpinner isLoading={isFetching} />
            { friends.length > 0 ? 
                <Grid templateColumns="repeat(4, 1fr)" gap="10px">
                    { showFriends() }
                </Grid> 
                :
                <Heading mt="50px" fontSize="20px" textAlign="center">친구목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FriendList;