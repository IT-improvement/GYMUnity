import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Card, CardBody, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const FriendRequestList = ({ shouldFetch }) => {
    const [friendRequests, setFriendRequests] = useState([]);
    const { sessionUser } = useContext(Context);
    const friendUrlPath = `${process.env.REACT_APP_SERVER_URL}/friends`;

    const fetchFriendRequests = () => {
        fetch(`${friendUrlPath}?command=read_all_friend_request_received`, {
            method: "GET",
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then(data => { console.log(data); setFriendRequests(data) })
        .catch(() => Toast.showFailed("친구 요청 목록 불러오기 실패"));
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
        .finally(() => {
            Toast.show(isDeclined, "친구 요청 거절 성공", "친구 요청 거절 불가");
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
            friendRequests.map(({ userCode, userId, userName }) =>
            <Card key={userCode}>
                <CardBody>
                    <Box p="10px" borderRadius="10px" bgColor="gray.300" _hover={{backgroundColor: "gray.400"}}>
                        <Link to={`/user/${userCode}`}>
                            <Avatar src="" size="2xl"/>
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
            { friendRequests.length > 0 ? 
                <Grid templateColumns="repeat(3, 1fr)" gap="30px" justifyContent="center" >
                    { showFriendRequests() }
                </Grid> 
                :
                <Heading mt="50px" fontSize="20px" textAlign="center">친구 요청 목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FriendRequestList;