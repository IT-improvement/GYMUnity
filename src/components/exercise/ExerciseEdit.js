import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Flex, Grid, Box, Heading, Text } from "@chakra-ui/react";
import Context from "../../Context";

const ExerciseEdit = () => {
    const [exercise, setExercise] = useState({});
    const [isLoggedIn] = useContext(Context);
    const { index } = useParams()

    const fetchExercise = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=read_one&exercise_index=${index}`, {
            method: "GET", 
            headers: {
                "Authorization": window.sessionStorage.getItem("userCode"), 
            }, 
        })
        .then(response => response.json())
        .then(data => setExercise(data))
        .catch(err => {
            return;
        });
    };

    const handlePostEditOnClick = () => {
        console.log("edit")
    };

    const handlePostDeleteOnClick = () => {
        console.log("delte")
    };

    useEffect(() => {
        fetchExercise();
    }, [index, isLoggedIn]);

    return (
        <Flex width="100%" p="10px">
            {exercise.isWriter ? "yess" : "no"}
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
                            <Text>게시일: {exercise.createDate}</Text>
                            <Text>수정일: {exercise.modDate}</Text>
                        </Box>
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

export default ExerciseEdit;