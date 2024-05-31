import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, VStack, Avatar, Grid, Spinner, Box, Card, CardBody, Button, Heading, Text } from "@chakra-ui/react";
import Sort from "../../utils/sort";
import Context from "../../Context";

const ExerciseList = ({ searchQuery, isDescOrder }) => {
    const [isFetching, setIsFetching] = useState(true);
    const [exercises, setExercises] = useState([]);
    const { isLoggedIn, userCode } = useContext(Context);
    const navigate = useNavigate();

    const fetchExercises = () => { 
        let apiPath = "exercises?command=read_all";

        if (searchQuery)
            apiPath = `exercises?command=read_all_by_query&query=${searchQuery}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/${apiPath}`)
        .then(response => response.json())
        .then(data =>  {
            setExercises(data);
        })
        .catch(err => {
        })
        .finally(() => {
            setIsFetching(false);
        });
    };

    const showExercises = () => {
        return (
            exercises.map(({ index, userCode, userId, userName, name, content, createDate, modDate }) => {
                return (
                    <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        key={index}
                        bgColor="gray.300" _hover={{backgroundColor: "gray.500"}}
                        >
                        <CardBody>
                            <Flex gap="10px">
                                <Box p="10px" borderRadius="10px" bgColor="gray.200" cursor="pointer"
                                    _hover={{backgroundColor: "gray.400"}}
                                    >
                                    <Link to={`/user/${userCode}`}>
                                        <Avatar src='' size="2xl"/>
                                        <VStack gap="10px">
                                            <Text>{userId}</Text>
                                            <Text>{userName}</Text>
                                        </VStack>
                                    </Link>
                                </Box>
                                <Link to={`/exercises/${index}`}>
                                    <VStack justify="center">
                                        <Text>운동 이름: {name}</Text>
                                        <Text>운동법: {content}</Text>
                                    </VStack>
                                    <VStack justify="center">
                                        <Text>작성일: {createDate}</Text>
                                        {modDate && <Text>수정일: {modDate}</Text> }
                                    </VStack>
                                </Link>
                            </Flex>
                        </CardBody>
                    </Card>
                );
            })
        );
    };

    const sortExerciseList = () => {
        if (isDescOrder) {
            setExercises(Sort.ObjectArrayInDescOrder(exercises, "createDate"));
        } else {
            setExercises(Sort.ObjectArrayInAsecOrder(exercises, "createDate"));
        }
    };

    useEffect(() => {
        fetchExercises();
    }, [searchQuery]);

    useEffect(() => {
        sortExerciseList();
    }, [isDescOrder]);

    return (
        <Flex w="100%" direction="column" p="10px">
            <Heading>운동법</Heading>
            {isLoggedIn &&
                <Flex>
                    <Button colorScheme="blue" onClick={() => navigate("/exercises/create")}>작성</Button>
                </Flex>
            }
            {isFetching && <Spinner /> }
            {exercises.length > 0 ?
                <Grid templateColumns="repeat(2, 1fr)" p="10px" borderRadius="10px"
                    gap="10px" justifyContent="center" bgColor="gray.50"
                >
                    {showExercises()}
                </Grid> 
                :
                <Heading as="h3" mt="50px" fontSize="20px" textAlign="center">운동법 목록이 비어있습니다</Heading>
            }
        </Flex>
    );
};

export default ExerciseList;