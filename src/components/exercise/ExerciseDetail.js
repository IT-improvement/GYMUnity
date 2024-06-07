import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardBody, Divider, Flex, Heading, Text, Table, TableContainer, Tbody, Tr, Td, Textarea } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";
import Timestamp from "../../utils/timestamp";

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
        .then(data => {
            setExercise(data);
        })
        .catch(() => {
            Toast.showFailed("운동법 로드 실패");
            navigate("/exercises");
        });
    };

    const handlePostDeleteOnClick = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=delete&exercise_index=${index}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code,
            }, 
        })
        .then(response => response.json())
        .then((data) => {
            if (data.status === 200) {
                Toast.showSuccess("운동법 삭제 성공");
                navigate("/exercises");
            }
        })
        .catch(() => {
            Toast.showFailed("운동법 삭제 실패");
        });
    };

    useEffect(() => {
        fetchExercise();
    }, [index, isLoggedIn]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Flex direction="column" w="50%" p="10px" m="0 auto" gap="10px">
            {exercise ? 
            <Flex direction="column" w="100%" gap="10px" bgColor="gray.50">
                <Heading textAlign="center">운동법 상세페이지</Heading>
                <Flex gap="10px">
                    <Card w="100%">
                        <CardBody>
                            <TableContainer maxW="1000px">
                                <Table>
                                    <Tbody>
                                    <Tr>
                                        <Td>작성자</Td>
                                        <Td>{exercise.userName}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>작성자 아아디</Td>
                                        <Td>{exercise.userId}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>카테고리</Td>
                                        <Td>{exercise.categoryName}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>작성일</Td>
                                        <Td>{Timestamp.convertToDate(exercise.createDate)}</Td>
                                    </Tr>
                                    { exercise.modDate &&
                                    <Tr>
                                        <Td>수정일</Td>
                                        <Td>{Timestamp.convertToDate(exercise.modDate)}</Td>
                                    </Tr>
                                    }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                            { isLoggedIn && (exercise.userCode === Number(sessionUser.code)) &&
                            <Flex justify="right" gap="10px">
                                <Button colorScheme="blue"
                                    onClick={() => navigate(`/exercises/update/${exercise.index}`)}>
                                    수정
                                </Button>
                                <Button colorScheme="red" onClick={handlePostDeleteOnClick}>삭제</Button>
                            </Flex>
                            }
                        </CardBody>
                    </Card>
                </Flex>
                <Flex direction="column" gap="10px">
                    <Card>
                        <CardBody>
                            <TableContainer maxW="1000px" overflowY="auto">
                                <Table>
                                    <Tbody>
                                    <Tr>
                                        <Td>제목</Td>
                                        <Td>{exercise.name}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>내용</Td>
                                    </Tr>
                                    <Tr>
                                        <Td colSpan="2">
                                            {exercise.content}
                                        </Td>
                                    </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </Flex>
            </Flex>
            :
            <Text>운동법이 존재하지 않습니다</Text>
            }
            <Box>
                <Button colorScheme="blue" onClick={() => navigate(-1)}>뒤로가기</Button>
            </Box>
        </Flex>
    );
};

export default ExerciseDetail;