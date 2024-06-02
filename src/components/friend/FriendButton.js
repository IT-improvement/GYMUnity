import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const friendButtonStatus = {
    friend: "친구 삭제",
    notFriend: "친구 요청하기",
    friendRequestSent: "친구 요청 취소",
    friendRequestReceived: "친구 요청 승락",
};

const FriendButton = ({ userCodeOther }) => {
    const [friendStatus, setFriendStatus] = useState("notFriend");
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();
    const friendUrlPath = `${process.env.REACT_APP_SERVER_URL}/friends`;

    const fetchFriendStatus = () => {
        fetch(`${friendUrlPath}?command=read_relationship_status&userCodeOther=${userCodeOther}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then(data => setFriendStatus(data.relationshipStatus))
        .finally(() => {
        });
    };

    const fetchFriendDelete = () => {
        fetch(`${friendUrlPath}?command=delete&userCodeFriend=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(() => fetchFriendStatus())
        .catch(() => Toast.showFailed("친구 삭제 실패"));
    };

    const fetchFriendRequestSend = () => {
        fetch(`${friendUrlPath}?command=create_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(() => fetchFriendStatus())
        .catch(() => Toast.showFailed("친구 요청 보내기 실패"));
    };

    const fetchFriendRequestCancel = () => {
        fetch(`${friendUrlPath}?command=delete_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(() => fetchFriendStatus())
        .catch(() => Toast.showFailed("친구 요청 취소 실패"));
    };

    const fetchFriendRequestAccept = () => {
        fetch(`${friendUrlPath}?command=accept_friend_request&userCodeOther=${userCodeOther}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(() => fetchFriendStatus())
        .catch(() => Toast.showFailed("친구 요청 수락 실패"));
    };

    const handleFriendRelationshipButtonOnClick = (e) => {
        if (!isLoggedIn)
            navigate("/user/login");

        const status = e.target.value;

        switch (status) {
            case "friend":
                fetchFriendDelete();
                return;
            case "notFriend":
                fetchFriendRequestSend();
                return;
            case "friendRequestSent":
                fetchFriendRequestCancel();
                return;
            case "friendRequestReceived":
                fetchFriendRequestAccept();
                return;
            default:
                return;
        }
    };

    useEffect(() => {
        if (!userCodeOther || !isLoggedIn) 
            return;

        fetchFriendStatus();
    }, [sessionUser, isLoggedIn, userCodeOther]);

    return (
        <Flex>
            <Button colorScheme="pink" value={friendStatus}
                onClick={handleFriendRelationshipButtonOnClick} >
                {friendButtonStatus[friendStatus]}
            </Button>
        </Flex>
    );
};

export default FriendButton;