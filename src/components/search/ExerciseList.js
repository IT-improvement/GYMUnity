import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, VStack, HStack, Grid, Image, Box, Button, Heading, Text } from "@chakra-ui/react";

const ExerciseListContainer = ({ searchQuery }) => {
    const [exercises, setExercises] = useState([]);

    const fetchExercises = () => { 
        let searchUrl = "exercises?command=read_all";

        if (searchQuery)
            searchUrl = `exercises?command=read_all_by_query&query=${searchQuery}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/${searchUrl}`)
            .then(response => response.json())
            .then(data => setExercises(data))
            .catch(err => {
                return;
        });
    };

    const showExercises = () => {
        return (
            exercises.map(({ index, userCode, userId, userName, name, content, createDate, modDate }) => {
                return (
                    <Box key={index} p="10px" borderRadius="10px" bgColor="gray.300" _hover={{backgroundColor: "gray.400"}}>
                        <Link to={`/exercises/${index}`}>
                            <Flex gap="10px">
                                <VStack gap="10px">
                                    <Image src={`${process.env.PUBLIC_URL}/images/user_profile_default.png`}
                                        w="150px" borderRadius="50%"
                                    />
                                    <Text>{userId}</Text>
                                    <Text>{userName}</Text>
                                </VStack>
                                <VStack justify="center">
                                    <Text>운동 이름: {name}</Text>
                                    <Text>운동법: {content}</Text>
                                </VStack>
                                <VStack justify="center">
                                    <Text>작성일: {createDate}</Text>
                                    {modDate && <Text>수정일: {modDate}</Text> }
                                </VStack>
                            </Flex>
                        </Link>
                    </Box>
                );
            })
        );
    };

    useEffect(() => {
        fetchExercises();
    }, [searchQuery]);

    return (
        <Flex direction="column">
            <Heading>운동법</Heading>
            {exercises.length > 0 ?
                <Grid templateColumns="repeat(1, 1fr)" p="10px" borderRadius="10px" gap="30px" justifyContent="center" bgColor="pink" >
                    {showExercises()}
                </Grid> 
                :
                <Heading as="h3" mt="50px" fontSize="20px" textAlign="center">운동법 목록이 비어있습니다</Heading>
            }
        </Flex>
    );
};

export default ExerciseListContainer;