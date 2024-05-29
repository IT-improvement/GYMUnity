import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Select, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFoodForm = () => {
    const [foodName, setFoodName] = useState('');
    const [protein, setProtein] = useState('');
    const [calory, setCalory] = useState('');
    const [carbs, setCarbs] = useState('');
    const [size, setSize] = useState('');
    const [foodCategory, setFoodCategory] = useState('');
    const [foodCategoryOptions, setFoodCategoryOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 더미 데이터 및 유저의 foodCategory를 가져옵니다.
        const fetchFoodCategories = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/foodCategory/service?command=readAllFoodCategory&userCode=1001'
                );
                setFoodCategoryOptions(response.data);
            } catch (error) {
                console.error('Error fetching food categories:', error);
            }
        };

        fetchFoodCategories();
    }, []);

    const handleCreateFood = async () => {
        try {
            const response = await axios.post('http://localhost:8080/', {
                foodName,
                protein,
                calory,
                carbs,
                size,
                foodCategory,
            });
            console.log('Food created:', response.data);
            // 성공적으로 음식이 생성되면 메인 페이지로 이동
            navigate('/');
        } catch (error) {
            console.error('Error creating food:', error);
        }
    };

    const handleCreateFoodCategory = () => {
        navigate('/createFoodCategory');
    };

    const navigateToCreateFoodCategoryForm = () => {
        navigate('/diet/createFoodCategory');
    };

    return (
        <Box>
            <Stack spacing={3}>
                <Input placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
                <Input placeholder="Protein" value={protein} onChange={(e) => setProtein(e.target.value)} />
                <Input placeholder="Calory" value={calory} onChange={(e) => setCalory(e.target.value)} />
                <Input placeholder="Carbs" value={carbs} onChange={(e) => setCarbs(e.target.value)} />
                <Input placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
                <Select
                    placeholder="Select food category"
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)}
                >
                    {foodCategoryOptions.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
                <Button onClick={handleCreateFood}>Create Food</Button>
                <Button onClick={navigateToCreateFoodCategoryForm}>Create Food Category</Button>
            </Stack>
        </Box>
    );
};

export default CreateFoodForm;
