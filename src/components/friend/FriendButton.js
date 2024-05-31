import { useState, useEffect, useContext } from "react";
import { Flex, Button, Text, } from "@chakra-ui/react";
import Context from "../../Context";

const FriendButton = () => {
    const [friendStatus, setFriendStatus] = useState("");
    const { isLoggedIn, userCode } = useContext(Context);
    const userCodeOther = 1002;

    const friendButtonStatus = {
        friend: "친구 삭제",
        notFriend: "친구 요청하기",
        friendRequestSent: "친구 요청 취소",
        friendRequestReceived: "친구 요청 승락",
    };

    const fetchFriendStatus = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=read_relationship_status&userCodeOther=${userCodeOther}`, {
            method: "GET", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(response => response.json())
        .then(data => setFriendStatus(data.relationshipStatus))
        .finally(() => {
        });
    };

    const fetchFriendDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=delete&userCodeFriend=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(() => fetchFriendStatus())
        .finally(() => {
        });
    };

    const fetchFriendRequestSend = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=create_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(() => fetchFriendStatus())
        .finally(() => {
        });
    };

    const fetchFriendRequestCancel = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=delete_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(() => fetchFriendStatus())
        .finally(() => {
        });
    };

    const fetchFriendRequestAccept = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=accept_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(() => fetchFriendStatus())
        .finally(() => {
        });
    };

    const handleFriendRelationshipButtonOnClick = (e) => {
        const status = e.target.value;

        console.log(status)

        switch (status) {
            case Object.keys(friendButtonStatus)[0]:
                fetchFriendDelete();
                return;
            case Object.keys(friendButtonStatus)[1]:
                fetchFriendRequestSend();
                return;
            case Object.keys(friendButtonStatus)[2]:
                fetchFriendRequestCancel();
                return;
            case Object.keys(friendButtonStatus)[3]:
                fetchFriendRequestAccept();
                return;
        }
    };

    useEffect(() => {
        fetchFriendStatus();
    }, [userCode]);
    return (
        <Flex>
            <Text>My userCode: {userCode}</Text>
            <Text>Other userCode: {userCodeOther}</Text>
            <Button colorScheme="pink" onClick={handleFriendRelationshipButtonOnClick} value={friendStatus}>
                {friendButtonStatus[friendStatus]}
            </Button>
        </Flex>
    );
};

export default FriendButton;