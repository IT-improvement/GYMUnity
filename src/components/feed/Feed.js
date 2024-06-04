import { Link } from "react-router-dom";
import { Avatar, Badge, Box, Card, CardBody, Flex, Image, Text } from "@chakra-ui/react";

const Feed = (props) => {
    const { feedIndex, title, content, userCode, userId, userName, 
            favoriteCount, checkFavorite, createDate, comments } = props.feed;

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

    return (
        <Card key={feedIndex}>
            <CardBody>
                <Flex direction="column" p="10px" gap="10px" borderRadius="10px" bgColor="gray.300">
                    <Link to={`/user/${userCode}`} >
                        <Card _hover={{backgroundColor: "gray.400"}}>
                            <CardBody>
                                <Flex gap="10px">
                                    <Avatar src="" size="md"/>
                                    <Flex direction="column">
                                        <Text>{userName}</Text>
                                        <Badge fontSize="15px" colorScheme="pink">
                                            {userId}
                                        </Badge>
                                    </Flex>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Link>

                    <Flex direction="column" gap="10px">
                        <Link to={`/feed/${feedIndex}`}> 
                            <Card _hover={{backgroundColor: "gray.400"}}>
                                <CardBody>
                                    <Flex direction="column" gap="20px">
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
                                    </Flex>
                                </CardBody>
                            </Card>
                        </Link>

                        <Card>
                            <CardBody>
                                <Flex justify="space-between">
                                    <Text>좋아요: {favoriteCount}</Text>
                                    <Image src={`${process.env.PUBLIC_URL}/images/${checkFavorite ? "liked.png" : "like.png"}`}
                                    cursor="pointer"
                                        onClick={() => props.handleLikeButtonOnClick(feedIndex, checkFavorite)}
                                    />
                                </Flex>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                { comments.length > 0 ?
                                    showComments(comments) :
                                    <Text>댓글이 없습니다</Text>
                                }
                            </CardBody>
                        </Card>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default Feed;