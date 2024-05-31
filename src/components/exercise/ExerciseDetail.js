import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Grid, Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import Context from "../../Context";

const ExerciseDetail = () => {
    const [exercise, setExercise] = useState({});
    const { isLoggedIn, userCode } = useContext(Context);
    const { index } = useParams()
    const navigate = useNavigate();
    const toast = useToast();

    const showExerciseDeleteStatus = (isSuccess) => {
        toast({
            title: `${isSuccess ? "운동법 삭제 성공" : "운동법 삭제 불가"}`,
            status: `${isSuccess ? "success" : "info"}`,
            duration: 1500,
            isClosable: true,
            position: "top",
        });
    };

    const fetchExercise = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=read_one&exercise_index=${index}`, {
            method: "GET", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(response => response.json())
        .then(data => setExercise(data))
        .finally(() => {
        });
    };

    const handlePostDeleteOnClick = () => {
        let isDeleted = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=delete&exercise_index=${index}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode,
            }, 
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 200)
                isDeleted = true;
        })
        .catch(err => {
        })
        .finally(() => {
            showExerciseDeleteStatus(isDeleted);
            
            if (isDeleted)
                navigate("/exercises");
        })
    };

    useEffect(() => {
        fetchExercise();
    }, [index, isLoggedIn]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Flex width="100%" p="10px">
            {exercise ? 
                <Flex width="100%" direction="column" bgColor="gray.50" p="10px">
                    <Heading>운동법</Heading>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <Box>
                            <Text>아이디: {exercise.userId}</Text>
                        </Box>
                        <Box>
                            <Text>이름: {exercise.userName}</Text>
                        </Box>

                        <Box>
                            <Text>카테고리: {exercise.categoryName}</Text>
                        </Box>
                        <Box>
                            <Text>작성일: {exercise.createDate}</Text>
                            {exercise.modDate && <Text>수정일: {exercise.modDate}</Text> }
                        </Box>
                        {isLoggedIn && (exercise.userCode === Number(window.sessionStorage.getItem("userCode"))) &&
                            <Box>
                                <Button colorScheme="blue" onClick={() => navigate(`/exercises/update/${exercise.index}`)}>수정</Button>
                                <Button colorScheme="red" onClick={handlePostDeleteOnClick}>삭제</Button>
                            </Box>
                        }
                    </Grid>

                    <Box>
                        <Text>제목</Text>
                        <Box p="10px" bgColor="white">
                            <Text>{exercise.name}</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Text>내용</Text>
                        <Box p="10px" bgColor="white">
                            <Text>{exercise.content}</Text>
                        </Box>
                    </Box>
                </Flex>
                : <Text>운동법이 존재하지 않습니다</Text>
            }
        </Flex>
    );
};

export default ExerciseDetail;