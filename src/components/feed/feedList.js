import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, VStack, Grid, Avatar, Image, Box, Heading, Text } from "@chakra-ui/react";

const FeedList = () => {
    const [feeds, setFeeds] = useState([]);
    
    const fetchFeeds = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed?command=feedRead`)
            .then(response => response.json())
            .then(data => setFeeds(data))
            .catch(err => {
                console.log(err);
        });
    };

    useEffect(() => {
        fetchFeeds();
    }, []);

    const showFeeds = () => {
        return (
            feeds.map(({title, content, userCode, createDate, comments, feedIndex}, index) => {
                return (
                    <Link to={`/feed/${feedIndex}`} key={index}>
                        <Box p="10px" borderRadius="10px" bgColor="gray.300" cursor="pointer" _hover={{backgroundColor: "gray.400"}}>
                            <Avatar src='' size="2xl"/>
                            <VStack gap="10px">
                                <Text>{title}</Text>
                                <Text>{content}</Text>
                                <Text>{userCode}</Text>
                                <Text>{createDate}</Text>
                                <Text>{comments}</Text>

                            </VStack>
                        </Box>
                    </Link>
                );
            })
        );
    };
    
    useEffect(() => {
        fetchFeeds();
    }, []);

    return (
        <VStack width="100%" p="10px">
            <Heading>피드목록</Heading>
            {feeds.length > 0 ? 
                <Grid templateColumns="repeat(3, 1fr)" gap="30px" justifyContent="center" >
                    {showFeeds()}
                </Grid> 
                :
                <Heading as="h3" mt="50px" fontSize="20px" textAlign="center">친구목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FeedList;