import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Flex, Grid, Heading } from "@chakra-ui/react";
import Context from "../../Context";
import ExerciseCard from "./ExerciseCard";
import ListSection from "../search/ListSection";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Toast from "../chakra/Toast";

const ExerciseList = ({ searchQuery, isDescOrder, isTotalSearch }) => {
    const [exercises, setExercises] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isFetching, setIsFetching] = useState(true);
    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();
    const itemLimit = 4;

    const fetchExercisesNextPage = () => {
        let params = searchQuery ?
            `command=read_all_by_query&isDescOrder=${isDescOrder}&query=${searchQuery}` :
            `command=read_all&isDescOrder=${isDescOrder}`;

        params += `&pageNumber=${pageNumber}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?${params}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (pageNumber === 1)
                setExercises(data);
            else
                setExercises([...exercises, ...data]);
        })
        .catch(() => { 
            Toast.showFailed("운동법 목록 로드 실패");
        })
        .finally(() => {
            setIsFetching(false);
        });
    };

    const handleNextPageOnClick = () => {
        setPageNumber(pageNumber + 1);
    };

    useEffect(() => {
        setPageNumber(1);
        fetchExercisesNextPage();
    }, [searchQuery, isDescOrder]);

    useEffect(() => {
        fetchExercisesNextPage();
    }, [pageNumber]);

    return (
        <ListSection>
            <Heading textAlign="center">운동법</Heading>
            { isLoggedIn && !isTotalSearch &&
                <Flex justify="right">
                    <Button colorScheme="blue" onClick={() => navigate("/exercises/create")}>운동법 작성</Button>
                </Flex>
            }
            { isFetching ?
                <Center><LoadingSpinner /></Center>
                :
                exercises.length > 0 ?
                    <Flex direction="column" gap="10px">
                        <Grid templateColumns={`repeat(${itemLimit}, 1fr)`} borderRadius="10px"
                            gap="10px" justifyContent="center" >
                               { exercises.map(exercise =>
                                    <ExerciseCard key={exercise.index} exercise={exercise} />
                               )} 
                        </Grid> 
                        { isTotalSearch ? (exercises.length >= itemLimit) &&
                        <Flex justify="right">
                            <Button onClick={() => navigate("/search", { state: { searchQuery: searchQuery, category: "exercise" }})} >
                                운동법 더보기
                            </Button>
                        </Flex>
                        : 
                        <Button onClick={handleNextPageOnClick} >
                            더보기
                        </Button>
                        }
                    </Flex>
                :
                <Heading fontSize="20px" textAlign="center">운동법이 없습니다</Heading>
            }
        </ListSection>
    );
};

export default ExerciseList;