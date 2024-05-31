import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast, Flex, Grid, Box, Select, Textarea, Heading, Button, Text, Input } from "@chakra-ui/react";
import Context from "../../Context";

const ExerciseUpdate = () => {
    const [exercise, setExercise] = useState({
        index: 0,
        userId: "",
        userName: "",
        categoryIndex: "",
        name: "",
        content: "",
        createDate: "",
        modDate: "",
    });

    const [exerciseCategories, setExerciseCategories] = useState([]);
    const { isLoggedIn, userCode } = useContext(Context);
    const { index } = useParams()
    const toast = useToast();
    const navigate = useNavigate();

    const showExerciseUpdateStatus = (isSuccess) => {
        toast({
            title: `운동법 작성 ${isSuccess ? "성공" : "불가"}`,
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
    };

    const fetchExerciseCategories = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exerciseCategories?command=read_all`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => setExerciseCategories(data))
    };

    const fetchExerciseUpdate = () => {
        let isUpdated = false;
        const params = `exercise_index=${exercise.index}&category_index=${exercise.categoryIndex}&name=${exercise.name}&content=${exercise.content}`

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=update&${params}`, {
            method: "GET", 
            headers: {
                "Authorization": userCode, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                isUpdated = true;
            }
        })
        .finally(() => {
            showExerciseUpdateStatus(isUpdated);
            navigate(`/exercises/${exercise.index}`);
        });
    };

    const handleExerciseFieldOnChange = (e) => {
        setExercise(oldExercise => {
            return {...oldExercise, [e.target.name]: e.target.value}
        });
    };

    const handleExerciseUpdateOnSubmit = (e) => {
        e.preventDefault();
        fetchExerciseUpdate();
    };

    useEffect(() => {
        fetchExercise();
        fetchExerciseCategories();
    }, [index, isLoggedIn]);

    return (
        <Flex width="100%" p="10px">
            {exercise ? 
                <Flex width="100%" direction="column" bgColor="gray.50" p="10px">
                    <form method="POST" onSubmit={handleExerciseUpdateOnSubmit}>
                        <Heading>운동법</Heading>
                        <Grid templateColumns="repeat(2, 1fr)">
                            <Box>
                                <Text>아이디: {exercise.userId}</Text>
                            </Box>
                            <Box>
                                <Text>이름: {exercise.userName}</Text>
                            </Box>

                            <Box>
                                <Select name="categoryIndex" onChange={handleExerciseFieldOnChange}>
                                    {exerciseCategories.map(category => {
                                        return (
                                            <option key={category.index} defaultChecked={category.index === exercise.categoryIndex}
                                            value={category.index}>
                                                {category.name}
                                            </option>
                                        )
                                    })}
                                </Select>
                            </Box>
                            <Box>
                                <Text>게시일: {exercise.createDate}</Text>
                                <Text>수정일: {exercise.modDate}</Text>
                            </Box>
                        </Grid>

                        <Box>
                            <Text>이름</Text>
                            <Input type="text" name="name" value={exercise.name} onChange={handleExerciseFieldOnChange} />
                        </Box>
                        <Box>
                            <Text>내용</Text>
                            <Textarea name="content" value={exercise.content} onChange={handleExerciseFieldOnChange} />
                        </Box>
                        <Button type="submit" colorScheme="blue">수정</Button>
                    </form>
                </Flex>
                : <Text>운동법이 존재하지 않습니다</Text>
            }
        </Flex>
    );
};

export default ExerciseUpdate;