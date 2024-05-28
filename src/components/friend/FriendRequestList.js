import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, VStack, HStack, Grid, Image, Box, Button, Heading, Text } from "@chakra-ui/react";

const FriendRequestListContainer = () => {
    const [friendRequests, setFriendRequests] = useState([]);

    const fetchFriendRequests = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends/requests?command=read_all`)
            .then(response => response.json())
            .then(data => setFriendRequests(data))
            .catch(err => {
                return;
        });
    };

    const handleAcceptFriendRequest = () => {
        console.log("accept")
    };

    const handleDeclineFriendRequest = () => {
        console.log("declihne")
    };

    const removeFriendRequestFromList = (userCode) => {
        setFriendRequests(friendRequests.filter(friendRequest => friendRequest.userCode !== userCode));
    };

    const showFriendRequests = () => {
        return (
            friendRequests.map(({ userCode, userId, userName }) => {
                return (
                    <Box key={userCode} p="10px" borderRadius="10px" bgColor="gray.300" _hover={{backgroundColor: "gray.400"}}>
                        <Link to={`/user/${userCode}`}>
                            <Image src={`${process.env.PUBLIC_URL}/images/user_profile_default.png`}
                                w="150px" borderRadius="50%"
                            />
                            <VStack gap="10px">
                                <Text>{userId}</Text>
                                <Text>{userName}</Text>
                            </VStack>
                        </Link>
                        <HStack justify="center">
                            <Button colorScheme="blue" onClick={handleAcceptFriendRequest}>수락</Button>
                            <Button colorScheme="red" onClick={() => handleDeclineFriendRequest(userCode)}>거절</Button>
                        </HStack>
                    </Box>
                );
            })
        );
    };
    
    useEffect(() => {
        fetchFriendRequests();
    }, []);

    return (
        <VStack width="100%" p="10px">
            <Heading>친구 요청 목록</Heading>
            {friendRequests.length > 0 ? 
                <Grid templateColumns="repeat(3, 1fr)" gap="30px" justifyContent="center" >
                    {showFriendRequests()}
                </Grid> 
                :
                <Heading as="h3" mt="50px" fontSize="20px" textAlign="center">친구 요청 목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FriendRequestListContainer;