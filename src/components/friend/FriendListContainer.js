import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, VStack, Grid, Image, Box, Heading, Text } from "@chakra-ui/react";

const FriendListContainer = () => {
    const [friends, setFriends] = useState([]);
    
    const fetchFriends = () => { 
        fetch(`${process.env.REACT_APP_SERVER_URL}/friends?command=read_all`)
            .then(response => response.json())
            .then(data => setFriends(data))
            .catch(err => {
                console.log(err);
        });
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    const showFriends = () => {
        return (
            friends.map(({userCode, userId, userName}, index) => {
                return (
                    <Link to={`/user/${userCode}`} key={index}>
                        <Box p="10px" borderRadius="10px" bgColor="gray.300" cursor="pointer" _hover={{backgroundColor: "gray.400"}}>
                            <Image src={`${process.env.PUBLIC_URL}/images/user_profile_default.png`}
                                w="150px" borderRadius="50%"
                            />
                            <VStack gap="10px">
                                <Text>{userId}</Text>
                                <Text>{userName}</Text>
                            </VStack>
                        </Box>
                    </Link>
                );
            })
        );
    };
    
    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <VStack width="100%" p="10px">
            <Heading>친구목록</Heading>
            {friends.length > 0 ? 
                <Grid templateColumns="repeat(3, 1fr)" gap="30px" justifyContent="center" >
                    {showFriends()}
                </Grid> 
                :
                <Heading as="h3" mt="50px" fontSize="20px" textAlign="center">친구목록이 비어있습니다</Heading>
            }
        </VStack>
    );
};

export default FriendListContainer;