import React, { useState, useEffect, useContext } from 'react';
import { Box, List, ListItem, Heading, Image, Text, Button, IconButton } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Context from '../../Context';

const ViewFoodListForm = () => {
    const [foodList, setFoodList] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isLoggedIn, sessionUser } = useContext(Context);

    useEffect(() => {
        const fetchFoodList = async () => {
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
                setFoodList(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFoodList();
    }, []);

    const handleDelete = async (foodIndex) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/food/service?command=deleteFood&foodIndex=${foodIndex}`,
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

            const result = await response.json();
            console.log(result.status);
            if (result.status === 200) {
                setFoodList(foodList.filter((food) => food.foodIndex !== foodIndex));
            } else {
                alert('삭제 실패');
            }
        } catch (error) {
            console.error('Error deleting food:', error);
            alert('Error deleting food');
        }
    };

    const handleEdit = (foodIndex) => {
        navigate(`/diet/editFood/${foodIndex}`);
    };

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Text color="red.500">{error}</Text>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Heading mb={4}>Food List</Heading>
            <List spacing={3}>
                {foodList.map((food) => (
                    <ListItem
                        key={food.foodIndex}
                        p={3}
                        borderWidth="1px"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                    >
                        {food.foodCategoryImageUrl && (
                            <Image
                                src={food.foodCategoryImageUrl}
                                alt={food.foodName}
                                boxSize="50px"
                                objectFit="cover"
                                mr={4}
                            />
                        )}
                        <Text flex="1">{food.foodName}</Text>
                        <IconButton
                            aria-label="Edit food"
                            icon={<EditIcon />}
                            onClick={() => handleEdit(food.foodIndex)}
                            mr={2}
                        />
                        <IconButton
                            aria-label="Delete food"
                            icon={<DeleteIcon />}
                            onClick={() => handleDelete(food.foodIndex)}
                        />
                    </ListItem>
                ))}
            </List>
            <Box mt={4}>
                <Button mt={2} onClick={() => navigate('/diet')}>
                    Back to Diet
                </Button>
                <Button mt={2} onClick={() => navigate('/diet/foodCategoryList')}>
                    Food Category List
                </Button>
            </Box>
        </Box>
    );
};

export default ViewFoodListForm;
