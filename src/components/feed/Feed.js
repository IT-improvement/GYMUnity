import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar, Badge, Box, Card, CardBody, Flex, Image, Text, Input, Center } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const Feed = (props) => {
    const { isLoggedIn, sessionUser } = useContext(Context);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    const { feedIndex, title, content, userCode, userId, 
            favoriteCount, checkFavorite, createDate, comments, imageURL } = props.feed;
            console.log(props.feed)

    const showComments = (comments) => {
        console.log(comments)
        if (!comments || comments.length === 0)
            return;

        let commentComponents = [];
        let index = 0;

        while (index <= comments.length) {
            
            const comment = comments[index++];
            try {
                commentComponents.push(<Text key={comment.feedCommentsIndex}>{comment.userName} : {comment.comment}</Text>)
                
            } catch (error) {
                console.log(error)
            }
            
        }
        
        return commentComponents;
    }; 
    
    const fetchFeedCommentCreate = () => {
        let isCreate = false;
        const params = `comment=${comment}&`
        console.log(feedIndex)
        console.log(comment)

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedCommentCreate&comment=${comment}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === 200)
                isCreate = true;
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
            Toast.show(isCreate, "댓글 생성 성공", "댓글 생성 실패");
            navigate(`/feed`);
        });
    }

    const handleFeedCommentFieldOnChange = (e) => {
        setComment(e.target.value
        );
    };

    const handleFeedCommentCreateOnSubmit = (e) => {
        e.preventDefault();
        fetchFeedCommentCreate();
    };
    console.log("ImageURL : " + imageURL)
    return (
        <Card>
            <CardBody>
                <Flex direction="column" p="10px" gap="10px" borderRadius="10px" bgColor="gray.300">
                    <Link to={`/user/${userCode}`} >
                        <Card _hover={{backgroundColor: "gray.400"}}>
                            <CardBody>
                                <Flex gap="10px">
                                    <Avatar src="" size="md"/>
                                    <Flex direction="column">
                                        <Badge colorScheme="pink">
                                            {userId}
                                        </Badge>
                                        <Text fontWeight="bold">{props.feed.userName}</Text>
                                        <Text fontWeight="bold">작성일 : {createDate}</Text>
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
                                        <Center>
                                                <Image src={`${imageURL ? imageURL : ""}`} /> 
                                        </Center>
                                        <Box>
                                            <Text fontWeight="bold">내용</Text>
                                            <Text>{content}</Text>
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
                                    showComments(comments)
                                     :
                                    <Text>댓글이 없습니다</Text>
                                }<form method="POST" onSubmit={handleFeedCommentCreateOnSubmit}>
                                <Input w="100%" type="text" name="comment" placeholder="댓글 쓰기" onChange={handleFeedCommentFieldOnChange} />
                                </form>
                                
                            </CardBody>
                        </Card>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default Feed;