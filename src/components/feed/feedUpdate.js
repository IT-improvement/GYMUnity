import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Avatar, Badge, Box, Button, Card, CardBody, Flex, Grid, Heading, Select, Text, Textarea, Input } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";
import { Link } from "react-router-dom";


const FeedUpdate = () => {
    const [feed, setFeed] = useState({
        title: "",
        content: "",
    });
    const { isLoggedIn, sessionUser } = useContext(Context);
    const { feedIndex } = useParams()
    const navigate = useNavigate();

    const fetchFeed = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedDetail`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            }, 
        })
        .then(response => response.json())
        .then(data => setFeed(data))
        .catch(() => {
            Toast.showFailed("피드 불러오기 실패");
            navigate("/feeds");
        });
    };


    const fetchFeedUpdate = () => {
        let isUpdated = false;
        const params =  `title=${feed.title}&` +
                        `content=${feed.content}&`

        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedUpdate&${params}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === 200)
                isUpdated = true;
        })
        .finally(() => {
            Toast.show(isUpdated, "피드 수정 성공", "피드 수정 실패");
            navigate(`/feed/${feed.feedIndex}`);
        });
    };

    const handleFeedFieldOnChange = (e) => {
        setFeed(oldFeed => {
            return {...oldFeed, [e.target.name]: e.target.value}
        });
    };

    const handleFeedUpdateOnSubmit = (e) => {
        e.preventDefault();
        fetchFeedUpdate();
    };

    useEffect(() => {
        fetchFeed();
    }, [feedIndex, isLoggedIn]);

    return (
        
                <Card key={feedIndex}>
                <form method="POST" onSubmit={handleFeedUpdateOnSubmit}>
                    <CardBody>
                        <Flex direction="column" p="10px" gap="10px" borderRadius="10px" bgColor="gray.300">
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

                    <Flex direction="column" gap="10px"> 
                            <Card _hover={{backgroundColor: "gray.400"}}>
                                <CardBody>
                                    <Flex direction="column" gap="20px">
                                        <Box>
                                            <Text fontWeight="bold">제목</Text>
                                            <Input type="text" name="title" value={feed.title} onChange={handleFeedFieldOnChange} />
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">내용</Text>
                                            <Input type="text" name="content" value={feed.content} onChange={handleFeedFieldOnChange} />
                                        </Box>
                                    </Flex>
                                </CardBody>
                            </Card>
                        <Box>
                        </Box>
                        <Flex>
                            <Button type="submit" colorScheme="green">수정</Button>
                        </Flex>
                    </Flex>
                </Flex>

            </CardBody>
            </form>
        </Card>


    );
};

export default FeedUpdate;
