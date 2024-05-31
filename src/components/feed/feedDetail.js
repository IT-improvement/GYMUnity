import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, userNavigate } from "react-router-dom";
import { Flex, VStack, Grid, Avatar, Image, Box, Heading, Text, Button, useToast, Toast } from "@chakra-ui/react";


const FeedDetail = () => {
    const [feed, setFeed] = useState({});
    const {feedIndex} = useParams();
    console.log(feedIndex);
    const toast = useToast();
    
    const fetchFeed = () => { 
        console.log(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedDetail`)
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedDetail`)
            .then(response => response.json())
            .then(data => setFeed(data))
            .catch(err => {
                console.log(err);
        });
    };

    useEffect(() => {
        fetchFeed();
    }, [feedIndex]);
const showExerciseDeleteStatus = (isSuccess) => {
    toast({
        title: `${isSuccess ? "피드 삭제 성공" : "피드 삭제 불가"}`,
        status: `${isSuccess ? "success" : "info"}`,
        duration: 1500,
        isClosable: true,
        position: "top",
    })
}
const handlePostDeleteOnClick=() => {
    let isDeleted = false;

    fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedDelete`, {
        headers: {
            "Authorization" : 1,
        },
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data)
        if (data.status === 200)
            isDeleted = true;
    })
    .catch(err => {
    })
    .finally(() => {
        showFeedDeleteStatus(isDeleted);
    })
}

    const showFeed = () => {
        return (
            
                    
                        <Box p="10px" borderRadius="10px" bgColor="gray.300" cursor="pointer" _hover={{backgroundColor: "gray.400"}}>
                            <Avatar src='' size="2xl"/>
                            <VStack gap="10px">
                                <Text>제목 : {feed.title}</Text>
                                <Text>작성자 : {feed.userName}</Text>
                                <Text>내용 : {feed.content}</Text>
                                <Text>유저번호 : {feed.userCode}</Text>
                                <Text>작성시간 : {feed.createDate}</Text>
                                <Text>댓글 : {feed.comments}</Text>
                                <Text>수정날짜 : {feed.modDate}</Text>
                                <Text>아이디 : {feed.userId}</Text>
                                
                                <Text>{feed.favoriteCount}</Text>
                                <Text>{feed.checkFavorite}</Text>
                                <Button onClick={handlePostDeleteOnClick}>게시글 삭제</Button>
                            </VStack>
                        </Box>
        );
    };
    

    return (
        <VStack width="100%" p="10px">
            <Heading>피드목록</Heading>
            
                <Grid templateColumns="repeat(3, 1fr)" gap="30px" justifyContent="center" >
                    {showFeed()}
                </Grid> 
                :
        </VStack>
    );
};

export default FeedDetail;