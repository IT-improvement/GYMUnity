import React, { useState } from 'react';
import { Box, Button, Input, Stack, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFoodCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate();

    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleCreateCategory = async () => {
        const formData = new FormData();
        formData.append('name', categoryName);
        formData.append('image', imageFile);

        try {
            const response = await axios.post(
                `http://localhost:8080/food/service?command=createFoodCategory&userCode=1001&categoryName=${categoryName}&categoryImageUrl=${imageFile}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data.status === 200) {
                alert('음식 카테고리 생성 완료');
                navigate('/diet/createFood');
            } else {
                alert('음식 카테고리 생성 실패');
            }
        } catch (error) {
            console.error('Error creating Food Category:', error);
            alert('Error creating Food Category');
        }
    };

    return (
        <Box p={4}>
            <Stack spacing={4}>
                <Input placeholder="Category Name" value={categoryName} onChange={handleCategoryNameChange} />
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imageFile && (
                    <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="Selected Image"
                        boxSize="150px"
                        objectFit="cover"
                    />
                )}
                <Button onClick={handleCreateCategory} colorScheme="teal">
                    카테고리 생성
                </Button>
            </Stack>
        </Box>
    );
};

export default CreateFoodCategoryForm;
