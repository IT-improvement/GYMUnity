import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Card, CardBody, Center, Flex, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Context from "../../Context";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Toast from "../chakra/Toast";
import UserCard from "../user/UserCard";

const FriendRequestList = ({ shouldFetch }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const { sessionUser } = useContext(Context);
    const friendUrlPath = `${process.env.REACT_APP_SERVER_URL}/friends`;

    const fetchFriendRequests = () => {
        setIsFetching(true);

        fetch(`${friendUrlPath}?command=read_all_friend_request_received`, {
            method: "GET",
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then(data => {
            setFriendRequests(data);
        })
        .catch(() => {
            Toast.showFailed("친구 요청 목록 불러오기 실패");
        })
        .finally(() => setIsFetching(false));
    };

    const handleAcceptFriendRequest = (userCodeOther) => {
        let isAccepted = false;

        fetch(`${friendUrlPath}?command=accept_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST",
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                isAccepted = true;
                removeFriendRequestFromList(userCodeOther);
            }
        })
        .catch(() => {
            Toast.showFailed("친구 수락 처리 실패");
        })
        .finally(() => {
            Toast.show(isAccepted, "친구 수락 성공", "친구 수락 실패");
        });
    };

    const handleDeclineFriendRequest = (userCodeOther) => {
        let isDeclined = false;

        fetch(`${friendUrlPath}?command=delete_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                isDeclined = true;
                removeFriendRequestFromList(userCodeOther);
            } 
        })
        .catch(() => {
            Toast.showFailed("친구 요청 처리 실패");
        })
        .finally(() => {
            Toast.show(isDeclined, "친구 요청 거절 성공", "친구 요청 거절 실패");
        });
    };

    const removeFriendRequestFromList = (userCode) => {
        setFriendRequests(friendRequests.filter(friendRequest => friendRequest.userCode !== userCode));
    };

    useEffect(() => {
        if (shouldFetch)
            fetchFriendRequests();
    }, [shouldFetch]);

    const showFriendRequests = () => {
        return (
            friendRequests.map(({ userCode, userId, userName, userProfileImage }) =>
            <Card key={userCode}>
                <CardBody>
                    <Box p="10px" borderRadius="10px" bgColor="gray.300" _hover={{backgroundColor: "gray.400"}}>
                        <Link to={`/user/${userCode}`}>
                            <Avatar src={userProfileImage} size="2xl"/>
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
            )
        );
    };
    
    return (
        <VStack w="100%" p="10px" gap="30px">
            <Heading>친구 요청 목록</Heading>
            { isFetching && 
                <Center>
                    <LoadingSpinner />
                </Center>
            }
            { friendRequests.length > 0 ? 
                <Grid templateColumns="repeat(4, 1fr)" gap="10px" >
                    { friendRequests.map(friend => {
                        return <Box p="10px" bgColor="gray.200" borderRadius="10px">
                            <Flex direction="column" gap="10px">
                                <UserCard key={friend.userCode} user={{ code: friend.userCode, id: friend.userId, name: friend.userName, profileImage: friend.userProfileImage }} />
                                <Button colorScheme="blue" onClick={() => handleAcceptFriendRequest(friend.userCode)}>수락</Button>
                                <Button colorScheme="red" onClick={() => handleDeclineFriendRequest(friend.userCode)}>거절</Button>
                            </Flex>
                        </Box>
                    }
                    )}
                </Grid> 
                :
                <Heading mt="50px" fontSize="20px" textAlign="center">친구 요청 목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FriendRequestList;