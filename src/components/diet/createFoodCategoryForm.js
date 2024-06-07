import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, FormControl, FormLabel, Input, Image, Stack } from '@chakra-ui/react';
import Context from '../../Context';
import Toast from '../chakra/Toast';
import FileUpload from '../feed/FileUpload';

const CreateFoodCategoryForm = () => {
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();
    const [foodCategory, setFoodCategory] = useState({
        categoryName: '',
        image: null,
    });

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        try {
            console.log(foodCategory);
            let isCreate = false;
            const encodedCategoryName = encodeURIComponent(foodCategory.categoryName);
            console.log(foodCategory.categoryName);
            console.log(encodedCategoryName);
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=createFoodCategory&categoryName=${encodedCategoryName}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: sessionUser.code,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        image: foodCategory.image,
                    }),
                }
            );

            const responseData = await response.json();
            if (responseData.status === 200) {
                Toast.show(true, '음식 카테고리 생성 완료', '음식 카테고리 생성 실패');
                navigate('/diet/foodList');
            } else {
                Toast.showFailed('음식 카테고리 생성 실패');
            }
        } catch (error) {
            console.error('Error creating Food Category:', error);
            Toast.showFailed('Error creating Food Category');
        }
    };

    const handleImageFieldOnChange = (e) => {
        setFoodCategory((oldImageFile) => {
            return { ...oldImageFile, [e.target.name]: e.target.value };
        });
    };

    const handleFileOnChange = (file) => {
        setFoodCategory((oldImageFile) => {
            return { ...oldImageFile, image: file };
        });
    };

    useEffect(() => {
        if (!isLoggedIn) navigate('/diet');
    }, [isLoggedIn, navigate]);

    return (
        <Flex w="100%" justify="center">
            <form style={{ minWidth: '70%' }} method="POST" onSubmit={handleCreateCategory}>
                <FormControl>
                    <FormLabel>카테고리 이름</FormLabel>
                    <Input
                        name="categoryName"
                        value={foodCategory.categoryName}
                        type="text"
                        onChange={handleImageFieldOnChange}
                    />
                </FormControl>
                <FileUpload handleFileOnChange={handleFileOnChange}></FileUpload>
                <Flex justify="space-between" mt={4}>
                    <Button colorScheme="blue" onClick={() => navigate(-1)}>
                        뒤로가기
                    </Button>
                    <Button type="submit" colorScheme="green">
                        카테고리 생성
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
};

export default CreateFoodCategoryForm;
