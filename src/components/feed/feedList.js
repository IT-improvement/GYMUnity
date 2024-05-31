import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Flex, VStack, Grid, Card, CardBody, Button, Image, Avatar, Box, Heading, Text } from "@chakra-ui/react";
import Sort from "../../utils/sort";
import Context from "../../Context";

const FeedList = ({ searchQuery, isDescOrder }) => {
    const [feeds, setFeeds] = useState([]);
    const { userCode } = useContext(Context);
    
    const fetchFeeds = () => { 
        let apiPath = "feed?command=feedRead";

        if (searchQuery)
            apiPath = `feed?command=feedReadByQuery&query=${searchQuery}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/${apiPath}`, {
            method: "GET", 
            headers: {
                "Authorization": userCode, 
            }, 
        })
        .then(response => response.json())
        .then(data => setFeeds(data))
        .finally(() => {
        });
    };

    const fetchLikeButtonOnClick = (feedIndex, checkFavorite) => { 
        let apiPath = `feed/${feedIndex}?command=${checkFavorite ? "feedFavoriteDelete" : "feedFavoritePlus"}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/${apiPath}`, {
            method: "GET", 
            headers: {
                "Authorization": userCode, 
            },
        })
        .finally(() => {
            fetchFeeds();
        });
    };

    const handleLikeButtonOnClick = (feedIndex, checkFavorite) => {
        fetchLikeButtonOnClick(feedIndex, checkFavorite);
    };

    const sortFeeds = () => {
        if (isDescOrder) {
            setFeeds(Sort.ObjectArrayInDescOrder(feeds, "createDate"));
        } else {
            setFeeds(Sort.ObjectArrayInAsecOrder(feeds, "createDate"));
        }
    };

    const showComments = (comments) => {
        if (!comments || comments.length === 0)
            return;

        const commentLimit = 2;
        let commentComponents = [];
        let index = 0;

        while (index < commentLimit - 1) {
            const comment = comments[index];

            commentComponents.push(<Text key={comment.feedCommentsIndex}>{comment.comment}</Text>)

            index++;
        }
        
        return commentComponents;
    }

    const showFeeds = () => {
        return (
            feeds.map(({feedIndex, title, content, userCode, userId, userName, favoriteCount, checkFavorite, createDate, comments}) => {
                return (
                    <Flex key={feedIndex} p="10px" gap="10px" direction="column" borderRadius="10px" bgColor="gray.300" _hover={{backgroundColor: "gray.400"}}>
                        <Link to={`/user/${userCode}`}>
                            <Card>
                                <CardBody>
                                    <Flex gap="10px">
                                        <Avatar src='' size="md"/>
                                        <Flex direction="column">
                                            <Text>{userId}</Text>
                                            <Text>{userName}</Text>
                                        </Flex>
                                    </Flex>
                                </CardBody>
                            </Card>
                        </Link>

                        <Flex direction="column" gap="10px">
                            <Link to={`/feed/detail/${feedIndex}`}> 
                                <Card>
                                    <CardBody>
                                        <Box>
                                            <Text fontWeight="bold">제목</Text>
                                            <Text>{title}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">내용</Text>
                                            <Text>{content}</Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">작성일</Text>
                                            <Text>{createDate}</Text>
                                        </Box>
                                    </CardBody>
                                </Card>
                            </Link>
                            <Box>
                                <Text>좋아요: {favoriteCount}</Text>
                            </Box>
                            <Box>
                                <Image src={`${process.env.PUBLIC_URL}/images/${checkFavorite ? "liked.png" : "like.png"}`}
                                onClick={() => handleLikeButtonOnClick(feedIndex, checkFavorite)}
                                />
                            </Box>
                            <Card>
                                <CardBody>
                                    { comments.length > 0 ?
                                        showComments(comments)
                                        :
                                        <Text>댓글이 없습니다</Text>
                                    }
                                </CardBody>
                            </Card>
                        </Flex>
                    </Flex>
                );
            })
        );
    };

    useEffect(() => {
        fetchFeeds();
    }, [searchQuery]);

    useEffect(() => {
        sortFeeds();
    }, [isDescOrder]);

    return (
        <VStack width="100%" p="10px">
            <Heading>피드목록</Heading>
            {feeds.length > 0 ? 
                <Grid templateColumns="repeat(3, 1fr)" gap="30px" justifyContent="center" >
                    {showFeeds()}
                </Grid> 
                :
                <Heading as="h3" mt="50px" fontSize="20px" textAlign="center">피드목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FeedList;