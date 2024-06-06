import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Image,
  Stack,
} from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const CreateFoodCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { isLoggedIn, sessionUser } = useContext(Context);
  const navigate = useNavigate();

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userCode", sessionUser.code);
      formData.append("categoryName", categoryName);
      formData.append("categoryImage", imageFile);

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=createFoodCategory`,
        {
          method: "POST",
          headers: {
            Authorization: sessionUser.code,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (responseData.status === 200) {
        Toast.show(true, "음식 카테고리 생성 완료", "음식 카테고리 생성 실패");
        navigate("/diet/foodList");
      } else {
        Toast.showFailed("음식 카테고리 생성 실패");
      }
    } catch (error) {
      console.error("Error creating Food Category:", error);
      Toast.showFailed("Error creating Food Category");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/diet");
  }, [isLoggedIn, navigate]);

  return (
    <Flex w="100%" justify="center">
      <form
        style={{ minWidth: "70%" }}
        method="POST"
        onSubmit={handleCreateCategory}
      >
        <FormControl>
          <FormLabel>카테고리 이름</FormLabel>
          <Input
            required
            type="text"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>카테고리 이미지</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imageFile && (
            <Image
              src={URL.createObjectURL(imageFile)}
              alt="Selected Image"
              boxSize="150px"
              objectFit="cover"
            />
          )}
        </FormControl>
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
