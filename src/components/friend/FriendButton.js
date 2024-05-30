import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Grid, Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import Context from "../../Context";

const FriendButton = () => {
    const [friendStatus, setFriendStatus] = useState(false);
    const { isLoggedIn, userCode } = useContext(Context);

    const friendButtonStatus = {
        friend: "친구",
        friendRequestSent: "친구 요청 보냄",
        friendRequestSentCancel: "친구 요청 취소",
        notFriend: "친구 요청하기",
    };

    const fetchFriendStatus = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=read_relationship_status&userCodeOther=${index}`, {
            method: "GET", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(response => response.json())
        .then(data => setFriendStatus(data))
        .finally(() => {
        });
    };
    return (
        <Flex>
            <Button>{friendButtonStatus.friendStatus}</Button>
        </Flex>
    );
};

export default FriendButton;