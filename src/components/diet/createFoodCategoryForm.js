import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Input, Stack, Image } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../App";

const CreateFoodCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [foodCategory, setFoodCategory] = useState(null);
  const [isLoggedin, setIsLoggedIn] = useContext(Context);
  const navigate = useNavigate();
  const { index } = useParams();

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  console.log(`${process.env.REACT_APP_SERVER_URL}`);

  // Function to fetch a food category by index
  const fetchFoodCategory = (categoryIndex) => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/food/service?command=readFoodCategory&categoryIndex=${categoryIndex}`,
      {
        method: "GET",
        headers: {
          Authorization: window.sessionStorage.getItem("userCode"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setFoodCategory(data))
      .catch((err) => {
        console.error("Error fetching food category:", err);
      });
  };

  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.append("userCode", window.sessionStorage.getItem("userCode")); // Add userCode to formData
    formData.append("categoryName", categoryName);
    formData.append("categoryImageUrl", imageFile);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/food/service?command=createFoodCategory&`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: window.sessionStorage.getItem("userCode"),
          },
        }
      );

      const responseData = await response.json();

      if (responseData.status === 200) {
        alert("음식 카테고리 생성 완료");
        navigate("/diet/createFood");
      } else {
        alert("음식 카테고리 생성 실패");
      }
    } catch (error) {
      console.error("Error creating Food Category:", error);
      alert("Error creating Food Category");
    }
  };

  useEffect(() => {
    const categoryIndex = 1;
    fetchFoodCategory(categoryIndex);
  }, []);

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <Input
          placeholder="Category Name"
          value={categoryName}
          onChange={handleCategoryNameChange}
        />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imageFile && (
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Selected Image"
            boxSize="150px"
            objectFit="cover"
          />
        )}
        <Button onClick={() => setIsLoggedIn(!isLoggedin)}>
          {isLoggedin ? "로그인 성공" : "로그인 바람"}
        </Button>
        <Button onClick={handleCreateCategory} colorScheme="teal">
          카테고리 생성
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateFoodCategoryForm;
