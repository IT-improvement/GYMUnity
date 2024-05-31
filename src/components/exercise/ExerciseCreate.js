import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Flex, Box, Select, Textarea, FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import Context from "../../Context";

const ExerciseCreate = () => {
    const [exercise, setExercise] = useState({
        categoryIndex: "",
        name: "",
        content: "",
    });

    const [exerciseCategories, setExerciseCategories] = useState([]);
    const { isLoggedIn, userCode } = useContext(Context);
    const toast = useToast();
    const navigate = useNavigate();

    const showExerciseCreateStatus = (isSuccess) => {
        toast({
            title: `운동법 작성 ${isSuccess ? "성공" : "불가"}`,
            status: `${isSuccess ? "success" : "info"}`,
            duration: 1500,
            isClosable: true,
            position: "top",
        });
    };

    const fetchExerciseCategories = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/exerciseCategories?command=read_all`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => setExerciseCategories(data))
        .catch(err => {
            return;
        });
    };

    const fetchExerciseCreate = () => {
        let isCreated = false;
        const params = `category_index=${exercise.categoryIndex}&name=${exercise.name}&content=${exercise.content}`

        fetch(`${process.env.REACT_APP_SERVER_URL}/exercises?command=create&${params}`, {
            method: "POST", 
            headers: {
                "Authorization": userCode, 
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200)
                isCreated = true;
        })
        .catch(err => {
        })
        .finally(() => {
            showExerciseCreateStatus(isCreated);

            if (isCreated)
                navigate("/exercises");
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
    }, [isLoggedIn]);


    return (
        <Flex>
            <form method="POST" onSubmit={handleExerciseCreateOnSubmit}>
                <FormControl>
                    <FormLabel>운동 카테고리</FormLabel>
                    <Select name="categoryIndex" onChange={handleExerciseFieldOnChange}>
                        <option defaultChecked disabled>카테고리 선택</option>
                        {exerciseCategories.map(category => {
                            return <option key={category.index} value={category.index}>
                                {category.name}
                            </option>
                        })}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>제목</FormLabel>
                    <Input isRequired type="text" name="name" onChange={handleExerciseFieldOnChange} value={exercise.name} />
                </FormControl>
                <FormControl>
                    <FormLabel>내용</FormLabel>
                    <Textarea isRequired name="content" colorScheme="blue"
                        value={exercise.content} onChange={handleExerciseFieldOnChange}
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue">작성</Button>
            </form>
        </Flex>
    );
};

export default ExerciseCreate;