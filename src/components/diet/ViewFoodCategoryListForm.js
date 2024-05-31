import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  Heading,
  Image,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ViewFoodCategoryListForm = () => {
  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodCategoryList = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=readAllFoodCategory&userCode=1001`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setFoodCategoryList(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFoodCategoryList();
  }, []);

  const handleDelete = async (categoryIndex) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=deleteFoodCategory&foodCategoryIndex=${categoryIndex}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      console.log(result.status);
      if (result.status === 200) {
        setFoodCategoryList(
          foodCategoryList.filter(
            (category) => category.foodCategoryIndex !== categoryIndex
          )
        );
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting food category:", error);
      alert("Error deleting food category");
    }
  };

  const handleEdit = (categoryIndex) => {
    navigate(`/diet/updateFoodCategory?foodCategoryIndex=${categoryIndex}`);
  };

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Food Category List</Heading>
      <List spacing={3}>
        {foodCategoryList.map((category) => (
          <ListItem
            key={category.categoryIndex}
            p={3}
            borderWidth="1px"
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            {category.categoryImageUrl && (
              <Image
                src={category.categoryImageUrl}
                alt={category.categoryName}
                boxSize="50px"
                objectFit="cover"
                mr={4}
              />
            )}
            <Text flex="1">{category.categoryName}</Text>
            <IconButton
              aria-label="Edit category"
              icon={<EditIcon />}
              onClick={() => handleEdit(category.foodCategoryIndex)}
              mr={2}
            />
            <IconButton
              aria-label="Delete category"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(category.foodCategoryIndex)}
            />
          </ListItem>
        ))}
      </List>
      <Button mt={4} onClick={() => navigate("/diet")}>
        Back to Diet
      </Button>
    </Box>
  );
};

export default ViewFoodCategoryListForm;
