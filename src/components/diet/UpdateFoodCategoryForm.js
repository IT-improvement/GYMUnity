import React, { useState, useEffect } from "react";
import { Box, Button, Input, Stack, Image } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFoodCategoryForm = () => {
  const { foodCategoryIndex } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [foodCategory, setFoodCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=readFoodCategory&foodCategoryIndex=${foodCategoryIndex}`,
          {
            method: "GET",
            headers: {
              Authorization: window.sessionStorage.getItem("userCode"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setCategoryName(data.categoryName);
        setFoodCategory(data);
      } catch (error) {
        console.error("Error fetching food category:", error);
      }
    };

    fetchFoodCategory();
  }, [foodCategoryIndex]);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleUpdateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("foodCategoryIndex", foodCategoryIndex);
      formData.append("categoryName", categoryName);
      if (imageFile) {
        formData.append("categoryImage", imageFile);
      }

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=updateFoodCategory`,
        {
          method: "POST",
          headers: {
            Authorization: window.sessionStorage.getItem("userCode"),
          },
          body: JSON.stringify({
            foodCategoryIndex: foodCategoryIndex,
            userCode: "1001",
            categoryName: categoryName,
            categoryImageUrl: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === 200) {
        alert("음식 카테고리 수정 완료");
        navigate("/diet/foodCategoryList");
      } else {
        alert("음식 카테고리 수정 실패");
        console.log(responseData);
      }
    } catch (error) {
      console.error("Error updating food category:", error);
      alert("Error updating food category");
    }
  };

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
        {foodCategory && foodCategory.categoryImageUrl && !imageFile && (
          <Image
            src={foodCategory.categoryImageUrl}
            alt={categoryName}
            boxSize="150px"
            objectFit="cover"
          />
        )}
        <Button onClick={handleUpdateCategory} colorScheme="teal">
          카테고리 수정
        </Button>
      </Stack>
      <Button mt={4} onClick={() => navigate("/diet/foodCategoryList")}>
        Back to Food Category List
      </Button>
    </Box>
  );
};

export default UpdateFoodCategoryForm;
