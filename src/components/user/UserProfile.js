import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Card, CardBody, Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Feed from "../feed/Feed";
import FriendButton from "../friend/FriendButton";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const UserProfile = () => {
    const [user, setUser] = useState({
        code: undefined,
        profileImage: "",
        id: "",
        name: "",
    });
    const [feeds, setFeeds] = useState([]);
    const [isUserFetching, setIsUserFetching] = useState(true);
    const [isFeedFetching, setIsFeedFetching] = useState(true);
    const { isLoggedIn, sessionUser } = useContext(Context);
    const { code } = useParams();

    const fetchUser = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=read_one&code=${code}`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
        .catch(() => {
            Toast.showFailed("유저 페이지 로드 실패");
        })
        .finally(() => {
            setIsUserFetching(false);
        })
    };

    const fetchFeeds = () => {
        let params = `command=feedReadByUserCode&userCodeFeedWriter=${user.code}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed?${params}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            },
        })
        .then(response => response.json())
        .then(data => {
            setFeeds(data);
        })
        .catch(() => {
            Toast.showFailed("유저 피드 로드 실패");
        })
        .finally(() => {
            setIsFeedFetching(false);
        });
    };

    const fetchLikeButtonOnClick = (feedIndex, checkFavorite) => { 
        const params = `command=${checkFavorite ? "feedFavoriteDelete" : "feedFavoritePlus"}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?${params}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            },
        })
        .catch(() => {
            Toast.showFailed("좋아요 처리 실패");
        })
        .finally(() => {
            fetchFeeds();
        });
    };

    const handleLikeButtonOnClick = (feedIndex, checkFavorite) => {
        if (!isLoggedIn) {
            Toast.showInfo("로그인이 필요합니다");
            return;
        }

        fetchLikeButtonOnClick(feedIndex, checkFavorite);
    };

    useEffect(() => {
        fetchUser();
    }, [code]);

    useEffect(() => {
        if (user.code)
            fetchFeeds();
    }, [user]);

    return (
        <Flex direction="column" w="100%" p="10px" gap="20px" align="center" >
            <Card w="300px">
                <CardBody>
                    { isUserFetching ?
                        <Center><LoadingSpinner/></Center>
                        :
                        <Flex direction="column" p="20px" gap="10px" justify="center" align="center">
                            <Avatar src={user.profileImage} value={user.profileImage} size="xl" />
                            <Box textAlign="center">
                                <Text fontWeight="bold">아이디</Text>
                                <Text>{user.id}</Text>
                                <Text fontWeight="bold">이름</Text>
                                <Text>{user.name}</Text>
                            </Box>
                            { sessionUser.code != user.code &&
                                <FriendButton userCodeOther={user.code} />
                            }
                        </Flex>
                    }
                </CardBody>
            </Card>
            { isFeedFetching ?
                <Center><LoadingSpinner/></Center>
                :
                feeds && feeds.length > 0 ?
                    <Grid templateColumns="repeat(4, 1fr)" gap="30px" justifyContent="center" >
                        {feeds.map(feed =>
                            <Feed key={feed.feedIndex} feed={feed} handleLikeButtonOnClick={handleLikeButtonOnClick} />
                        )}
                    </Grid> 
                    :
                    <Heading textAlign="center" fontSize="20px">피드가 존재하지 않습니다</Heading>
            }
        </Flex>
    );
};

export default UserProfile;