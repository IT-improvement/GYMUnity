import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardBody, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const ExerciseDetail = () => {
    const [exercise, setExercise] = useState({});
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
            Toast.showFailed("운동법 불러오기 실패");
            navigate("/exercises")
        });
    };

    const handlePostDeleteOnClick = () => {
        let isDeleted = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=delete&exercise_index=${index}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 200)
                isDeleted = true;
        })
        .finally(() => {
            Toast.show(isDeleted, "운동법 삭제 성공", "운동법 삭제 실패");
            
            if (isDeleted)
                navigate("/exercises");
        });
    };

    useEffect(() => {
        fetchExercise();
    }, [index, isLoggedIn]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Flex direction="column" w="100%" p="10px">
            {exercise ? 
            <Flex direction="column" w="100%" p="10px" gap="30px" bgColor="gray.50">
                <Heading>운동법</Heading>
                <Flex w="100%" gap="10px">
                    <Card w="100%">
                        <CardBody>
                            <Flex align="center" justify="space-between">
                                <Text>작성자: {exercise.userName}</Text>
                                <Text>작성자 아이디: {exercise.userId}</Text>
                                <Text>카테고리: {exercise.categoryName}</Text>
                                <Text>작성일: {exercise.createDate}</Text>
                                { exercise.modDate && <Text>수정일: {exercise.modDate}</Text> }
                                { isLoggedIn && (exercise.userCode === Number(sessionUser.code)) &&
                                <Flex gap="10px">
                                    <Button colorScheme="blue"
                                        onClick={() => navigate(`/exercises/update/${exercise.index}`)}>
                                        수정
                                    </Button>
                                    <Button colorScheme="red" onClick={handlePostDeleteOnClick}>삭제</Button>
                                </Flex>
                                }
                            </Flex>
                        </CardBody>
                    </Card>
                </Flex>

                <Flex direction="column" gap="10px">
                    <Card>
                        <CardBody>
                            <Text>제목: {exercise.name}</Text>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody>
                            <Text>내용</Text>
                            <Divider borderWidth="2px" m="5px 0px" />
                            <Text>{exercise.content}</Text>
                        </CardBody>
                    </Card>
                </Flex>
            </Flex>
            :
            <Text>운동법이 존재하지 않습니다</Text>
            }
            <Box>
                <Button colorScheme="blue" onClick={() => navigate("/search")}>뒤로가기</Button>
            </Box>
        </Flex>
    );
};

export default ExerciseDetail;