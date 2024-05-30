import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useToast, VStack, HStack, Grid, Card, CardBody, Avatar, Box, Button, Heading, Text } from "@chakra-ui/react";
import Context from "../../Context";

const FriendRequestList = ({ shouldFetch }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const { userCode } = useContext(Context);
    const toast = useToast();

    const showToastFriendRequestAcceptStatus = (isSuccess) => {
        toast({
            title: `${isSuccess ? "친구 수락 성공" : "친구 수락 불가"}`,
            status: `${isSuccess ? "success" : "info"}`,
            duration: 1500,
            isClosable: true,
            position: "top",
        });
    };

    const showToastFriendRequestDeclineStatus = (isSuccess) => {
        toast({
            title: `${isSuccess ? "친구 요청 거절 성공" : "친구 요청 거절 불가"}`,
            status: `${isSuccess ? "success" : "info"}`,
            duration: 1500,
            isClosable: true,
            position: "top",
        });
    };

    const fetchFriendRequests = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=read_all_friend_request_received`, {
            method: "GET", 
            headers: {
                "Authorization": userCode, 
            }, 
        })
        .then(response => response.json())
        .then(data => setFriendRequests(data))
        .catch(err => {
            return;
        });
    };

    const handleAcceptFriendRequest = (userCode) => {
        let isAccepted = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=accept_friend_request&userCodeOther=${userCode}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                isAccepted = true;
                removeFriendRequestFromList(userCode);
            } 
        })
        .catch(err => {
        })
        .finally(() => {
            showToastFriendRequestAcceptStatus(isAccepted);
        });
    };

    const handleDeclineFriendRequest = (userCode) => {
        let isDeclined = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=delete_friend_request&userCodeOther=${userCode}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                isDeclined = true;
                removeFriendRequestFromList(userCode);
            } 
        })
        .finally(() => {
            showToastFriendRequestDeclineStatus(isDeclined);
        });
    };

    const removeFriendRequestFromList = (userCode) => {
        setFriendRequests(friendRequests.filter(friendRequest => friendRequest.userCode !== userCode));
    };

    const showFriendRequests = () => {
        return (
            friendRequests.map(({ userCode, userId, userName }) => {
                return (
                <Card key={userCode}>
                    <CardBody>
                        <Box p="10px" borderRadius="10px" bgColor="gray.300" _hover={{backgroundColor: "gray.400"}}>
                            <Link to={`/user/${userCode}`}>
                                <Avatar src='' size="2xl"/>
                                <VStack gap="10px">
                                    <Text>{userId}</Text>
                                    <Text>{userName}</Text>
                                </VStack>
                            </Link>
                            <HStack justify="center">
                                <Button colorScheme="blue" onClick={() => handleAcceptFriendRequest(userCode)}>수락</Button>
                                <Button colorScheme="red" onClick={() => handleDeclineFriendRequest(userCode)}>거절</Button>
                            </HStack>
                        </Box>
                    </CardBody>
                </Card>
                );
            })
        );
    };
    
    useEffect(() => {
        if (shouldFetch)
            fetchFriendRequests();
    }, [shouldFetch]);

    return (
        <VStack width="100%" p="10px" gap="30px">
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

export default FriendRequestList;