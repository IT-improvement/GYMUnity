import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Flex, VStack, Grid, Avatar, Image, Box, Heading, Text } from "@chakra-ui/react";


const FeedDetail = () => {
    const [feed, setFeed] = useState({});
    const {feedIndex} = useParams();
    console.log(feedIndex);
    
    const fetchFeed = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed/${feedIndex}?command=feedDetail`)
            .then(response => response.json())
            .then(data => setFeed(data))
            .catch(err => {
                console.log(err);
        });
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    const showFeed = () => {
        return (
            
                    
                        <Box p="10px" borderRadius="10px" bgColor="gray.300" cursor="pointer" _hover={{backgroundColor: "gray.400"}}>
                            <Avatar src='' size="2xl"/>
                            <VStack gap="10px">
                                <Text>{feed.title}</Text>
                                <Text>{feed.content}</Text>
                                <Text>{feed.userCode}</Text>
                                <Text>{feed.createDate}</Text>
                                <Text>{feed.comments}</Text>
                            </VStack>
                        </Box>
        );
    };
    
    useEffect(() => {
        fetchFeed();
    }, []);

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