import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Box, Button, Card, CardBody, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import Context from "../../Context";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Sort from "../../utils/sort";

const ExerciseList = ({ searchQuery, isDescOrder, isTotalSearch }) => {
    const [exercises, setExercises] = useState([]);
    const [itemLimit] = useState(3);
    const [isFetching, setIsFetching] = useState(true);
    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    const fetchExercises = () => {
        let params = searchQuery ?
            `command=read_all_by_query&query=${searchQuery}` :
            `command=read_all`;

        if (isTotalSearch)
            params += `&limit=${itemLimit}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?${params}`)
        .then(response => response.json())
        .then(data => setExercises(data))
        .finally(() => {
            setIsFetching(false);
        });
    };

    const sortExerciseList = () => {
        if (isDescOrder)
            setExercises(Sort.ObjectArrayInDescOrder(exercises, "createDate"));
        else
            setExercises(Sort.ObjectArrayInAsecOrder(exercises, "createDate"));
    };

    const showExercises = () => {
        return (
            exercises.map(({ index, userCode, userId, userName, name, content, createDate, modDate }) =>
                <Card key={index} _hover={{backgroundColor: "gray.500"}} >
                    <CardBody>
                        <Grid templateColumns="repeat(2, 1fr)" p="10px" gap="10px" borderRadius="10px">
                            <Box p="10px" borderRadius="10px" bgColor="gray.200" cursor="pointer"
                                _hover={{backgroundColor: "gray.400"}} >
                                <Link to={`/user/${userCode}`}>
                                    <Flex direction="column" gap="10px" align="center">
                                        <Avatar src="" size="2xl"/>
                                        <VStack gap="10px">
                                            <Text>{userName}</Text>
                                            <Badge fontSize="15px" colorScheme="pink">
                                                {userId}
                                            </Badge>
                                        </VStack>
                                    </Flex>
                                </Link>
                            </Box>
                            <Link to={`/exercises/${index}`}>
                                <Flex direction="column" gap="10px">
                                    <Text>운동 이름: {name}</Text>
                                    <Text>운동법: {content}</Text>
                                    <Text>작성일: {createDate}</Text>
                                    {modDate && <Text>수정일: {modDate}</Text> }
                                </Flex>
                            </Link>
                        </Grid>
                    </CardBody>
                </Card>
            )
        );
    };

    useEffect(() => {
        fetchExercises();
    }, [searchQuery]);

    useEffect(() => {
        sortExerciseList();
    }, [isDescOrder]);

    return (
        <Flex direction="column" p="10px" bgColor="gray.300" gap="10px" borderRadius="10px">
            <Heading>운동법</Heading>
            { isLoggedIn && !isTotalSearch &&
                <Flex justify="right">
                    <Button colorScheme="blue" onClick={() => navigate("/exercises/create")}>운동법 작성</Button>
                </Flex>
            }
            { isFetching && <LoadingSpinner /> }
            { exercises.length > 0 ?
                <Flex direction="column" gap="10px">
                    <Grid templateColumns={`repeat(${itemLimit}, 1fr)`} p="10px" borderRadius="10px"
                        gap="10px" justifyContent="center" >
                            { showExercises() }
                    </Grid> 
                    { isTotalSearch && (exercises.length >= itemLimit) &&
                    <Flex justify="right">
                        <Box p="10px" textAlign="center" bgColor="gray.200" borderRadius="10px" cursor="pointer"
                            onClick={() => navigate("/search", { state: { searchQuery: searchQuery, category: "exercise" }})} >
                                <Text color="gray.600">운동법 더보기</Text>
                        </Box>
                    </Flex>
                    }
                </Flex>
                :
                <Heading fontSize="20px" textAlign="center">운동법이 없습니다</Heading>
            }
        </Flex>
    );
};

export default ExerciseList;