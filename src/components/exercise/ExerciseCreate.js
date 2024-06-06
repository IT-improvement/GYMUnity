import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, FormControl, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const ExerciseCreate = () => {
    const [exercise, setExercise] = useState({
        categoryIndex: "",
        name: "",
        content: "",
    });
    const [exerciseCategories, setExerciseCategories] = useState([]);
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();

    const fetchExerciseCategories = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exerciseCategories?command=read_all`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => {
            setExerciseCategories(data);
        })
        .catch(() => {
            Toast.showFailed("운동 카테고리 불러오기 실패");
        });
    };

    const fetchExerciseCreate = () => {
        const params =  `category_index=${exercise.categoryIndex}&` +
                        `name=${exercise.name}&` +
                        `content=${exercise.content}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=create&${params}`, {
            method: "POST", 
            headers: {
                "Authorization": sessionUser.code, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                Toast.showSuccess("운동법 작성 성공");
                navigate("/exercises");
            }
        })
        .catch(() => {
            Toast.showFailed("운동법 작성 실패");
        });
    };

    const handleExerciseFieldOnChange = (e) => {
        setExercise(oldExercise => {
            return {...oldExercise, [e.target.name]: e.target.value}
        });
    };

    const handleExerciseCreateOnSubmit = (e) => {
        e.preventDefault();
        fetchExerciseCreate();
    };

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/exercises");

        fetchExerciseCategories();
    }, [isLoggedIn, navigate]);

    return (
        <Flex w="100%" justify="center">
            <form style={{ "minWidth": "70%"}} method="POST" onSubmit={handleExerciseCreateOnSubmit}>
                <FormControl>
                    <FormLabel> 운동 카테고리</FormLabel>
                    <Select isRequired name="categoryIndex" placeholder="카테고리 선택" onChange={handleExerciseFieldOnChange}>
                        {exerciseCategories.map(category =>
                            <option key={category.index} value={category.index}>
                                {category.name}
                            </option>
                        )}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>제목</FormLabel>
                    <Input isRequired type="text" name="name" 
                        value={exercise.name}
                        onChange={handleExerciseFieldOnChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>내용</FormLabel>
                    <Textarea isRequired name="content"
                        bgColor="white"
                        value={exercise.content}
                        onChange={handleExerciseFieldOnChange}
                    />
                </FormControl>
                <Flex justify="space-between">
                    <Button colorScheme="blue" onClick={() => navigate(-1)}>뒤로가기</Button>
                    <Button type="submit" colorScheme="green">작성</Button>
                </Flex>
            </form>
        </Flex>
    );
};

export default ExerciseCreate;