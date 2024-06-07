import { useContext, useEffect, useState } from "react";
import { Center, Grid, Heading, VStack } from "@chakra-ui/react";
import Context from "../../Context";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Toast from "../chakra/Toast";
import UserCard from "../user/UserCard";

const FriendList = ({ shouldFetch }) => {
    const [friends, setFriends] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const { sessionUser } = useContext(Context);
    
    const fetchFriends = () => { 
        setIsFetching(true);

        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=read_all`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then(data => {
            setFriends(data);
        })
        .catch(() => {
            Toast.showFailed("친구 목록 로드 실패");
        })
        .finally(() => {
            setIsFetching(false);
        });
    };

    useEffect(() => {
        if (shouldFetch)
            fetchFriends();
    }, [shouldFetch]);

    return (
        <VStack w="100%" p="10px" gap="30px">
            <Heading>친구목록</Heading>
            { isFetching ?
                <Center>
                    <LoadingSpinner />
                </Center>
                :
                friends.length > 0 ? 
                <Grid templateColumns="repeat(4, 1fr)" gap="10px">
                    { friends.map(friend =>
                        <UserCard key={friend.userCode} user={{ code: friend.userCode, id: friend.userId, name: friend.userName, profileImage: friend.userProfileImage }} />
                    )}
                </Grid> 
                :
                <Heading mt="50px" fontSize="20px" textAlign="center">친구목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FriendList;