import { useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Box, Button, Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Context from "../../Context";
import ExerciseCard from "./ExerciseCard";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Sort from "../../utils/sort";
import Toast from "../chakra/Toast";

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
        .catch(() => Toast.showFailed("운동법 목록 로드 실패"))
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

    useEffect(() => {
        fetchExercises();
    }, [searchQuery]);

    useEffect(() => {
        sortExerciseList();
    }, [isDescOrder]);

    return (
        <Flex direction="column" w="100%" p="10px" bgColor="gray.300" gap="10px" borderRadius="10px" >
            <Heading>운동법</Heading>
            { isLoggedIn && !isTotalSearch &&
                <Flex justify="right">
                    <Button colorScheme="blue" onClick={() => navigate("/exercises/create")}>운동법 작성</Button>
                </Flex>
            }
            { isFetching ?
            <Center>
                <LoadingSpinner />
            </Center>
                :
                exercises.length > 0 ?
                    <Flex direction="column" gap="10px">
                        <Grid templateColumns={`repeat(${itemLimit}, 1fr)`} p="10px" borderRadius="10px"
                            gap="10px" justifyContent="center" >
                               { exercises.map(exercise =>
                                    <ExerciseCard exercise={exercise} />
                               )} 
                                
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