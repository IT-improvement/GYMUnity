import React, { useState, useEffect, useContext } from 'react';
import { Button, Select, Box, Input, Stack, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Context from '../../Context';

const Diet = () => {
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [newFood, setNewFood] = useState('');
    const [foodOptions, setFoodOptions] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn, sessionUser } = useContext(Context);

    useEffect(() => {
        const fetchFoodOptions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/food/service?command=readFoodList&userCode=${sessionUser.code}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();
                console.log(`responseData : ${JSON.stringify(data)}`);

                if (data && Array.isArray(data)) {
                    setFoodOptions(data);
                } else {
                    console.error('Expected an array, but got:', data);
                }
            } catch (error) {
                console.error('Error fetching food options:', error);
            }
        };

        fetchFoodOptions();
    }, []);

    const addFoodToDiet = () => {
        setSelectedFoods([...selectedFoods, '']);
    };

    const handleFoodChange = (index, event) => {
        const updatedFoods = [...selectedFoods];
        updatedFoods[index] = event.target.value;
        setSelectedFoods(updatedFoods);
    };

    const handleNewFoodChange = (event) => {
        setNewFood(event.target.value);
    };

    const removeFoodFromDiet = (index) => {
        const updatedFoods = [...selectedFoods];
        updatedFoods.splice(index, 1);
        setSelectedFoods(updatedFoods);
    };

    return (
        <Box>
            <Button onClick={addFoodToDiet}>Add Food</Button>
            <Stack spacing={3} mt={4}>
                {selectedFoods.map((food, index) => (
                    <Box key={index} display="flex" alignItems="center">
                        <Select placeholder="Select food" value={food} onChange={(e) => handleFoodChange(index, e)}>
                            {foodOptions.map((option) => (
                                <option key={option.id} value={option.name}>
                                    {option.foodName}
                                </option>
                            ))}
                        </Select>
                        <IconButton
                            aria-label="Remove food"
                            icon={<CloseIcon />}
                            onClick={() => removeFoodFromDiet(index)}
                            ml={2}
                        />
                    </Box>
                ))}
            </Stack>
            <Box mt={4}>
                <Button mt={2} onClick={() => navigate('/diet/createFood')}>
                    Add New Food
                </Button>
                <Button mt={2} onClick={() => navigate('/diet/foodList')}>
                    FoodList
                </Button>
                <Button mt={2} onClick={() => navigate('/diet/foodCategoryList')}>
                    FoodCategoryList
                </Button>
            </Box>
        </Box>
    );
};

export default Diet;
