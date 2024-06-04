import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import Context from '../../Context';
import Toast from '../chakra/Toast';

const EditFood = () => {
    const { foodIndex } = useParams();
    const [food, setFood] = useState({
        categoryIndex: '',
        name: '',
        protein: '',
        calory: '',
        carbs: '',
        size: '',
    });
    const [foodCategories, setFoodCategories] = useState([]);
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();

    const fetchFoodCategories = () => {
        fetch(
            `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=readAllFoodCategory&userCode=${sessionUser.code}`,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((data) => setFoodCategories(data))
            .catch(() => Toast.showFailed('음식 카테고리 불러오기 실패'));
    };

    const fetchFoodDetails = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/food/service?command=readDetailFood&foodIndex=${foodIndex}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setFood({
                    categoryIndex: data.foodCategoryIndex,
                    name: data.foodName,
                    protein: data.protein,
                    calory: data.calory,
                    carbs: data.carbs,
                    size: data.size,
                });
                console.log('data: ' + data);
            })
            .catch(() => Toast.showFailed('음식 정보 불러오기 실패'));
    };

    const fetchFoodUpdate = () => {
        let isUpdated = false;
        const requestBody = {
            userCode: sessionUser.code,
            foodIndex: foodIndex,
            foodCategoryIndex: food.categoryIndex,
            foodName: food.name,
            protein: food.protein,
            calory: food.calory,
            carbs: food.carbs,
            size: food.size,
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/food/service?command=updateFood`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionUser.code,
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) isUpdated = true;
            })
            .finally(() => {
                Toast.show(isUpdated, '음식 수정 성공', '음식 수정 실패');

                if (isUpdated) navigate('/diet');
            });
    };

    const handleFoodFieldOnChange = (e) => {
        setFood((oldFood) => {
            return { ...oldFood, [e.target.name]: e.target.value };
        });
    };

    const handleFoodUpdateOnSubmit = (e) => {
        e.preventDefault();
        fetchFoodUpdate();
    };

    useEffect(() => {
        if (!isLoggedIn) navigate('/diet');

        fetchFoodCategories();
        fetchFoodDetails();
    }, [isLoggedIn, navigate, foodIndex]);

    return (
        <Flex w="100%" justify="center">
            <form style={{ minWidth: '70%' }} method="POST" onSubmit={handleFoodUpdateOnSubmit}>
                <FormControl>
                    <FormLabel>음식 카테고리</FormLabel>
                    <Select required name="categoryIndex" value={food.categoryIndex} onChange={handleFoodFieldOnChange}>
                        <option value="" disabled>
                            카테고리 선택
                        </option>
                        {foodCategories.map((category) => (
                            <option key={category.foodCategoryIndex} value={category.foodCategoryIndex}>
                                {category.categoryName}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>음식 이름</FormLabel>
                    <Input isRequired type="text" name="name" value={food.name} onChange={handleFoodFieldOnChange} />
                </FormControl>
                <FormControl>
                    <FormLabel>단백질 (g)</FormLabel>
                    <Input
                        isRequired
                        type="number"
                        name="protein"
                        value={food.protein}
                        onChange={handleFoodFieldOnChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>칼로리 (kcal)</FormLabel>
                    <Input
                        isRequired
                        type="number"
                        name="calory"
                        value={food.calory}
                        onChange={handleFoodFieldOnChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>탄수화물 (g)</FormLabel>
                    <Input
                        isRequired
                        type="number"
                        name="carbs"
                        value={food.carbs}
                        onChange={handleFoodFieldOnChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>양 (g)</FormLabel>
                    <Input isRequired type="number" name="size" value={food.size} onChange={handleFoodFieldOnChange} />
                </FormControl>
                <Flex justify="space-between">
                    <Button colorScheme="blue" onClick={() => navigate(-1)}>
                        뒤로가기
                    </Button>
                    <Button type="submit" colorScheme="green">
                        수정
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
};

export default EditFood;
