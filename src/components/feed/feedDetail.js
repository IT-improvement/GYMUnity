import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../../Context";
import LoadingSpinner from "../chakra/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";
import { Badge, Flex, VStack, Grid, Avatar, Image, Box, Heading, Text, Button, useToast, Card, CardBody } from "@chakra-ui/react";
import Toast from "../chakra/Toast";

const FeedDetail = () => {
    const [feed, setFeed] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const { isLoggedIn, sessionUser } = useContext(Context);
    const { feedIndex } = useParams();
    const navigate = useNavigate();
    console.log(useParams())
    let params = `command=feedDetail`;
    console.log(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?${params}`);
    console.log(sessionUser.code)
    const fetchFeed = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?${params}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            },
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
          setFeed(data)
        })
        .catch(() => {
            setIsFetching(false);
        })

        
        .finally(() => {
            setIsFetching(false);

            
            
  
        });

    }
    console.log(feed);



    const showComments = (comments) => {
        if (!comments || comments.length === 0)
            return;

        const commentLimit = 2;
        let commentComponents = [];
        let index = 0;

        while (index < commentLimit - 1) {
            const comment = comments[index++];
            commentComponents.push(<Text key={comment.feedCommentsIndex}>{comment.comment}</Text>)
        }
        
        return commentComponents;
    };

    const fetchLikeButtonOnClick = (feedIndex, checkFavorite) => { 
        const params = `command=${checkFavorite ? "feedFavoriteDelete" : "feedFavoritePlus"}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?${params}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            },
        })
        .catch(() => Toast.showFailed("좋아요 처리 실패"))
        .finally(() => {
            fetchFeed();
        });
        
    };

    const handleLikeButtonOnClick = (feedIndex, checkFavorite) => {
        if (!isLoggedIn) {
            Toast.showInfo("로그인이 필요합니다");
            return;
        }

        fetchLikeButtonOnClick(feedIndex, checkFavorite);
    };

    const handlePostDeleteOnClick = () => {
        let isDeleted = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedDelete`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 200)
                isDeleted = true;
        })
        .finally(() => {
            Toast.show(isDeleted, "피드 삭제 성공", "피드 삭제 실패");
            
            if (isDeleted)
                navigate("/feed");
        });
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
            <div>
                {
                    feed ? 
                    <Card key={feedIndex}>
                <CardBody>
                <Flex direction="column" p="10px" gap="10px" borderRadius="10px" bgColor="gray.300">
                    <Link to={`/user/${feed.userCode}`} >
                        <Card _hover={{backgroundColor: "gray.400"}}>
                            <CardBody>
                                <Flex gap="10px">
                                    <Avatar src="" size="md"/>
                                    <Flex direction="column">
                                        <Text>{feed.userName}</Text>
                                        <Badge fontSize="15px" colorScheme="pink">
                                            {feed.userId}
                                        </Badge>
                                    </Flex>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>

                    <Flex direction="column" gap="10px"> 
                            <Card _hover={{backgroundColor: "gray.400"}}>
                                <CardBody>
                                    <Flex direction="column" gap="20px">
                                        <Box>
                                            <Text fontWeight="bold">제목</Text>
                                            <Text>{feed.title}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">내용</Text>
                                            <Text>{feed.content}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">작성일</Text>
                                            <Text>{feed.createDate}</Text>
                                        </Box>
                                    </Flex>
                                </CardBody>
                            </Card>

                        <Card>
                            <CardBody>
                                <Flex justify="space-between">
                                    <Text>좋아요: {feed.favoriteCount}</Text>
                                    <Image src={`${process.env.PUBLIC_URL}/images/${feed.checkFavorite ? "liked.png" : "like.png"}`}
                                    cursor="pointer"
                                        onClick={() => handleLikeButtonOnClick(feedIndex, feed.checkFavorite)}
                                    />
                                </Flex>
                            </CardBody>
                        </Card>

                         <Card>
                            <CardBody>
                                { feed && feed.comments && feed.comments.length > 0 ?
                                    showComments(feed.comments) :
                                    <Text>댓글이 없습니다</Text>
                                }
                            </CardBody>
                        </Card>
                        
                        { isLoggedIn && (feed.userCode === Number(sessionUser.code)) &&
                                <Flex gap="10px">
                                    <Button colorScheme="blue"
                                        onClick={() => navigate(`/feed/${feedIndex}/feedupdate`)}>
                                        수정
                                    </Button>
                                    <Button colorScheme="red" onClick={handlePostDeleteOnClick}>삭제</Button>
                                </Flex>
                                }
                        <Card>
                        </Card>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>

                : <LoadingSpinner></LoadingSpinner>}
                  

            </div>
           
    );
};

export default FeedDetail;