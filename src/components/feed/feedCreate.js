import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Badge, Card, CardBody, useToast, Flex, Box, Select, Heading, FormControl, FormLabel, Button, Text, Input } from "@chakra-ui/react";
import Context from "../../Context";

const FeedCreate = () => {
    const [feed, setFeed] = useState({
        title: "",
        content: "",
    });
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();
    console.log(feed.title)
        console.log(feed.content)
    const fetchFeedCreate = () => {
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed?command=feedCreate&title=${feed.title}&content=${feed.content}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            }
        
        })
    }



   

    const handleFeedCreateOnSubmit = () => {
        fetchFeedCreate();
        console.log("on sumbi9t");
    };

    const handleFeedFieldOnChange = (e) => {
        setFeed(oldFeed => {
            return {...oldFeed, [e.target.name]: e.target.value};
        });
    };

    console.log(feed)

    return (
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
                
            </Flex>
        </Flex>
    </CardBody>
    );
};

export default FeedCreate;