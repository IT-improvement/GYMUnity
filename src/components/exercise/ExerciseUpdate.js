import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, Flex, FormControl, FormLabel, Heading, Select, Text, Textarea, Input } from "@chakra-ui/react";
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
    const { index } = useParams();
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
            Toast.showFailed("운동법 수정 불가 (운동법 로드 실패)");
            navigate("/exercises");
        });
    };

    const fetchExerciseCategories = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exerciseCategories?command=read_all`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => {
            setExerciseCategories(data);
        })
        .catch(() => {
            Toast.showFailed("운동법 수정 불가 (운동 카테고리 로드 실패)");
            navigate("/exercises");
        });
    };

    const fetchExerciseUpdate = () => {
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
            if (data.status === 200) {
                Toast.showSuccess("운동법 수정 성공");
                navigate(`/exercises/${exercise.index}`);
            }
        })
        .catch(() => {
            Toast.showFailed("운동법 수정 실패");
        });
    };

    const handleExerciseFieldOnChange = (e) => {
        setExercise(oldExercise => {
            return { ...oldExercise, [e.target.name]: e.target.value }
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
        <Flex direction="column" w="50%" p="10px" m="0 auto" gap="10px">
            <Heading textAlign="center">운동법 수정 페이지</Heading>
            {exercise ? 
            <Card>
                <CardBody>
                <form method="POST" onSubmit={handleExerciseUpdateOnSubmit}>
                    <Flex direction="column" gap="10px">
                        <FormControl>
                            <FormLabel> 운동 카테고리</FormLabel>
                            <Select name="categoryIndex"
                                value={exercise.categoryIndex}
                                onChange={handleExerciseFieldOnChange}>
                                { exerciseCategories.map(category =>
                                    <option key={category.index} value={category.index}>
                                        {category.name}
                                    </option>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>운동 이름</FormLabel>
                            <Input isRequired type="text" name="name" value={exercise.name} onChange={handleExerciseFieldOnChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>내용</FormLabel>
                            <Textarea isRequired name="content" value={exercise.content} onChange={handleExerciseFieldOnChange} />
                        </FormControl>
                        <Flex justify="space-between">
                            <Button colorScheme="blue" onClick={() => navigate(-1)}>뒤로가기</Button>
                            <Button type="submit" colorScheme="green">수정</Button>
                        </Flex>
                    </Flex>
                </form>
                </CardBody>
            </Card>
            :
            <Text>운동법이 존재하지 않습니다</Text>
            }
        </Flex>
    );
};

export default ExerciseUpdate;