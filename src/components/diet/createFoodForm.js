import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Input, Select, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Context from '../../Context';

const CreateFoodForm = () => {
    const [foodName, setFoodName] = useState('');
    const [protein, setProtein] = useState('');
    const [calory, setCalory] = useState('');
    const [carbs, setCarbs] = useState('');
    const [size, setSize] = useState('');
    const [foodCategory, setFoodCategory] = useState('');
    const [foodCategoryOptions, setFoodCategoryOptions] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn, sessionUser } = useContext(Context);

    useEffect(() => {
        const fetchFoodCategories = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=readAllFoodCategory&userCode=${sessionUser.code}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: sessionUser.code,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                console.log('Fetched categories:', data);
                setFoodCategoryOptions(data);
            } catch (error) {
                console.error('Error fetching food categories:', error);
            }
        };

        fetchFoodCategories();
    }, []);

    const handleCreateFood = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/food/service?command=createFood`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: window.sessionStorage.getItem('userCode'),
                },
                body: JSON.stringify({
                    userCode: sessionUser.code,
                    foodCategoryIndex: foodCategory,
                    foodName: foodName,
                    protein: protein,
                    calory: calory,
                    carbs: carbs,
                    size: size,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const responseData = await response.json();
            console.log('Food created:', responseData);

            if (responseData.status === 200) {
                alert('음식 생성 성공');
                navigate('/diet');
            } else {
                alert('음식 생성 실패');
            }
        } catch (error) {
            console.error('Error creating food:', error);
            alert('Error creating food: ' + error.message);
        }
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
                        <option key={category.foodCategoryIndex} value={category.foodCategoryIndex}>
                            {category.categoryName}
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
