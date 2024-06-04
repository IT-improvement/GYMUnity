import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardBody, Flex, Grid, Heading, Select, Text, Textarea, Input } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

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
    const { isLoggedIn, sessionUser } = useContext(Context);
    const { index } = useParams()
    const navigate = useNavigate();

    const fetchExercise = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=read_one&exercise_index=${index}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            }, 
        })
        .then(response => response.json())
        .then(data => setExercise(data))
        .catch(() => {
            Toast.showFailed("운동법 수정 불가 (운동법 로드 실패)");
            navigate("/exercises");
        });
    };

    const fetchExerciseCategories = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exerciseCategories?command=read_all`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => setExerciseCategories(data))
        .catch(() => {
            Toast.showFailed("운동법 수정 불가 (운동 카테고리 로드 실패)");
            navigate("/exercises");
        });
    };

    const fetchExerciseUpdate = () => {
        let isUpdated = false;
        const params =  `exercise_index=${exercise.index}&` +
                        `category_index=${exercise.categoryIndex}&` +
                        `name=${exercise.name}&` +
                        `content=${exercise.content}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=update&${params}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === 200)
                isUpdated = true;
        })
        .finally(() => {
            Toast.show(isUpdated, "운동법 수정 성공", "운동법 수정 실패");
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
        <Flex w="100%" p="10px">
            {exercise ? 
            <Flex direction="column" w="100%" p="10px" bgColor="gray.50">
                <form method="POST" onSubmit={handleExerciseUpdateOnSubmit}>
                    <Heading>운동법</Heading>
                    <Flex direction="column" gap="10px">
                        <Grid templateColumns="repeat(2, 1fr)" p="0px" gap="10px">
                            <Card>
                                <CardBody>
                                    <Flex align="center" gap="10px">
                                        <Text minW="fit-content">카테고리</Text>
                                        <Select name="categoryIndex"
                                            value={exercise.categoryIndex}
                                            onChange={handleExerciseFieldOnChange}>
                                            { exerciseCategories.map(category =>
                                                <option key={category.index} value={category.index}>
                                                    {category.name}
                                                </option>
                                            )}
                                        </Select>
                                    </Flex>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody alignContent="center">
                                    <Flex gap="10px">
                                        <Text>게시일 {exercise.createDate}</Text>
                                        <Text>이전 수정일 {exercise.modDate}</Text>
                                    </Flex>
                                </CardBody>
                            </Card>
                        </Grid>
                        <Card>
                            <CardBody>
                                <Flex align="center" gap="10px">
                                    <Text>이름</Text>
                                    <Input type="text" name="name" value={exercise.name} onChange={handleExerciseFieldOnChange} />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <Flex direction="column" gap="10px">
                                    <Text>내용</Text>
                                    <Textarea name="content" value={exercise.content} onChange={handleExerciseFieldOnChange} />
                                </Flex>
                            </CardBody>
                        </Card>
                        <Box>
                        </Box>
                        <Flex justify="space-between">
                            <Button colorScheme="blue" onClick={() => navigate(-1)}>뒤로가기</Button>
                            <Button type="submit" colorScheme="green">수정</Button>
                        </Flex>
                    </Flex>
                </form>
            </Flex>
            :
            <Text>운동법이 존재하지 않습니다</Text>
            }
        </Flex>
    );
};

export default ExerciseUpdate;