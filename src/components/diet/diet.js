import React, { useState, useEffect, useContext } from 'react';
import { Button, Select, Box, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { Context } from '../../App';

const Diet = () => {
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [newFood, setNewFood] = useState('');
    const [foodOptions, setFoodOptions] = useState([]);
    const [isLoggedin, setIsLoggedIn] = useContext(Context);

    useEffect(() => {
        // API를 통해 초기 데이터 가져오기
        const fetchFoodOptions = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/food/service?command=readFoodList&userCode=1001',
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                    }
                );
                console.log(`responseData : ${response.data}`);

                if (response.data && Array.isArray(response.data.data)) {
                    setFoodOptions(response.data.data);
                } else {
                    console.error('Expected an array, but got:', response.data);
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

    const handleAddNewFood = async () => {
        if (newFood.trim()) {
            try {
                const response = await axios.post('/', { name: newFood });
                setFoodOptions([...foodOptions, response.data]);
                setNewFood('');
            } catch (error) {
                console.error('Error adding new food:', error);
            }
        }
    };

    return (
        <Box>
            <Button onClick={() => setIsLoggedIn(!isLoggedin)}>{isLoggedin ? '로그인 성공' : '로그인 바람'}</Button>
            <Button onClick={addFoodToDiet}>Add Food</Button>
            <Stack spacing={3} mt={4}>
                {selectedFoods.map((food, index) => (
                    <Box key={index}>
                        <Select placeholder="Select food" value={food} onChange={(e) => handleFoodChange(index, e)}>
                            {foodOptions.map((option) => (
                                <option key={option.id} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </Select>
                    </Box>
                ))}
            </Stack>
            <Box mt={4}>
                <Input placeholder="New food" value={newFood} onChange={handleNewFoodChange} />
                <Button mt={2} onClick={handleAddNewFood}>
                    Add New Food
                </Button>
            </Box>
        </Box>
    );
};

export default Diet;
