import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar, Button, Badge, Box, Card, CardBody, Flex, Image, Text, Input, Center } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const Feed = (props) => {
    const [user, setUser] = useState({
        code: undefined,
        profileImage: "",
        id: "",
        name: "",
    });
    const { isLoggedIn, sessionUser } = useContext(Context);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();
    const { feedIndex, title, content, userCode, userId, 
            favoriteCount, checkFavorite, createDate, comments, imageURL, profileImage } = props.feed;
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
                
                if(isLoggedIn && (comment.userCode === Number(sessionUser.code))) {
                    commentComponents.push(
                        <Flex>
                            <form method="POST" onSubmit={handleFeedCommentUpdateOnSubmit}>
                                <Input type="text" name="comment" defaultValue={comment.comment} onChange={handleFeedFieldOnChange}/>
                                    
                            <Button colorScheme="blue" size='s' variant='link'
                            onClick={() => {handleFeedCommentUpdateOnSubmit(comment.feedCommentsIndex)}}>
                            수정
                            </Button>
                            <Button colorScheme="red" size='s' variant='link' onClick={() => {handleFeedCommentDeleteOnSubmit(comment.feedCommentsIndex)}}>삭제</Button>
                        
                            </form>
                        </Flex>
                    )
                }else {
                    commentComponents.push(<Text key={comment.feedCommentsIndex}>{comment.userName} : {comment.comment}</Text>)
                }
                
            } catch (error) {
                console.log(error)
            }
            
        }
        
        return commentComponents;
    }; 

    const handleFeedCommentUpdateOnSubmit = (params) => {
        let isUpdate = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${params}?command=feedCommentUpdate&comment=${comment.comment}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 200)
                isUpdate = true;
        })
        .finally(() => {
            Toast.show(isUpdate, "댓글 업데이트 성공", "댓글 업데이트 실패");
            
            if (isUpdate)
                navigate("/feed");
            window.location.reload();
        });
    }

    const handleFeedCommentDeleteOnSubmit = (params) => {
        let isDeleted = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${params}?command=feedCommentDelete`, {
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
            Toast.show(isDeleted, "댓글 삭제 성공", "댓글 삭제 실패");
            if (isDeleted)
                navigate("/feed");
        });
    }

    const handleFeedFieldOnChange = (e) => {
        setComment(oldComment => {
            return { ...oldComment, [e.target.name]: e.target.value };
        });
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
            navigate("/feed");
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

    const fetchUser = () => {
        const code = sessionUser;
        console.log(code.code);
        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=read_one&code=${code.code}`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
        .catch(() => {
            Toast.showFailed("유저 페이지 로드 실패");
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);


    console.log("ImageURL : " + imageURL)
    return (
        <Card key={"Card - " + feedIndex}>
            <CardBody>
                <Flex direction="column" p="10px" gap="10px" borderRadius="10px" bgColor="gray.300">
                    <Link to={`/user/${userCode}`} >
                        <Card _hover={{backgroundColor: "gray.400"}}>
                            <CardBody>
                                <Flex gap="10px">
                                    {
                                        profileImage ?
                                            <Image borderRadius='full'
                                            boxSize='50px'
                                            alt='Dan Abramov' 
                                            src={profileImage}/> :
                                            <Avatar src=""/>
                                    }
                                
                                    <Flex direction="column">
                                        <Badge>
                                        <Text>{props.feed.userName}</Text>
                                        </Badge>
                                        <Badge colorScheme="blue">
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
                                }
                                <form method="POST" onSubmit={handleFeedCommentCreateOnSubmit}>
                                <Flex>
                                    <Input w="100%" type="text" name="comment" placeholder="댓글 쓰기" onChange={handleFeedCommentFieldOnChange} />
                                    <Button onClick={handleFeedCommentCreateOnSubmit}>댓글 저장</Button>
                                </Flex>
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