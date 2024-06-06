import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Context from "../../Context";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Sort from "../../utils/sort";

const ViewFoodListForm = ({ searchQuery, isDescOrder, isTotalSearch }) => {
  const [foodList, setFoodList] = useState([]);
  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemLimit] = useState(3);
  const { isLoggedIn, sessionUser } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/food/service?command=readFoodList&userCode=${sessionUser.code}`,
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
        setFoodList(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFoodCategoryList = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=readAllFoodCategory&userCode=${sessionUser.code}`,
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
        console.log("categoryData:" + data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionUser) {
      fetchFoodList();
      fetchFoodCategoryList();
    }
  }, [sessionUser]);

  const handleDelete = async (foodIndex) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/food/service?command=deleteFood&foodIndex=${foodIndex}`,
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
      if (result.status === 200) {
        setFoodList(foodList.filter((food) => food.foodIndex !== foodIndex));
        alert("음식 삭제 성공");
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Error deleting food");
    }
  };

  const handleDeleteCategory = async (foodIndex) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=deleteFoodCategory&foodCategoryIndex=${foodIndex}`,
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
      if (result.status === 200) {
        setFoodList(foodList.filter((food) => food.foodIndex !== foodIndex));
        alert("카테고리 삭제 성공");
        navigate("/diet/foodList", { replace: true }); // 새로고침
        window.location.reload();
      } else {
        alert("삭제 실패");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Error deleting food");
    }
  };

  const handleEdit = (foodIndex) => {
    navigate(`/diet/editFood/${foodIndex}`);
  };

  const handleViewDetail = (foodIndex) => {
    navigate(`/diet/viewFoodDetail/${foodIndex}`);
  };

  const getCategoryName = (categoryIndex) => {
    const category = foodCategoryList.find(
      (cat) => cat.foodCategoryIndex === categoryIndex
    );
    return category ? category.categoryName : "Unknown Category";
  };

  const sortFoodList = () => {
    if (isDescOrder) {
      setFoodList(Sort.ObjectArrayInDescOrder(foodList, "createDate"));
    } else {
      setFoodList(Sort.ObjectArrayInAsecOrder(foodList, "createDate"));
    }
  };

  useEffect(() => {
    sortFoodList();
  }, [isDescOrder]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <LoadingSpinner />
      </Box>
    );
  }

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
    <Flex
      direction="column"
      p="10px"
      bgColor="gray.300"
      gap="10px"
      borderRadius="10px"
    >
      <Heading mb={4}>Food List & Category List</Heading>

      {/* Food List Section */}
      <Box>
        <Heading size="md">Food List</Heading>
        {isLoggedIn && (
          <Flex justify="right">
            <Button
              colorScheme="blue"
              onClick={() => navigate("/diet/createFood")}
            >
              Food 생성
            </Button>
          </Flex>
        )}
        {foodList.length > 0 ? (
          <Flex direction="column" gap="10px">
            <Grid
              templateColumns={`repeat(${itemLimit}, 1fr)`}
              p="10px"
              borderRadius="10px"
              gap="10px"
              justifyContent="center"
            >
              {foodList.map((food) => (
                <Card
                  key={food.foodIndex}
                  _hover={{ backgroundColor: "gray.500" }}
                  onClick={() => handleViewDetail(food.foodIndex)}
                >
                  <CardBody>
                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      p="10px"
                      gap="10px"
                      borderRadius="10px"
                    >
                      <Box
                        p="10px"
                        borderRadius="10px"
                        bgColor="gray.200"
                        cursor="pointer"
                        _hover={{ backgroundColor: "gray.400" }}
                      >
                        <Flex direction="column" gap="10px" align="center">
                          {food.foodCategoryImageUrl && (
                            <Image
                              src={food.foodCategoryImageUrl}
                              alt={food.foodName}
                              boxSize="50px"
                              objectFit="cover"
                            />
                          )}
                          <Text>{food.foodName}</Text>
                        </Flex>
                      </Box>
                      <Flex direction="column" gap="10px">
                        <Text>음식 이름: {food.foodName}</Text>
                        <Text>
                          음식 종류: {getCategoryName(food.foodCategoryIndex)}
                        </Text>
                        <Text>작성일: {food.createDate}</Text>
                        {food.modDate && <Text>수정일: {food.modDate}</Text>}
                        <Flex justify="right">
                          <IconButton
                            aria-label="Edit food"
                            icon={<EditIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(food.foodIndex);
                            }}
                            mr={2}
                          />
                          <IconButton
                            aria-label="Delete food"
                            icon={<DeleteIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(food.foodIndex);
                            }}
                          />
                        </Flex>
                      </Flex>
                    </Grid>
                  </CardBody>
                </Card>
              ))}
            </Grid>
            {isTotalSearch && foodList.length >= itemLimit && (
              <Flex justify="right">
                <Box
                  p="10px"
                  textAlign="center"
                  bgColor="gray.200"
                  borderRadius="10px"
                  cursor="pointer"
                  onClick={() =>
                    navigate("/search", {
                      state: { searchQuery, category: "food" },
                    })
                  }
                >
                  <Text color="gray.600">음식 더보기</Text>
                </Box>
              </Flex>
            )}
          </Flex>
        ) : (
          <Heading fontSize="20px" textAlign="center">
            음식이 없습니다
          </Heading>
        )}
      </Box>

      {/* Food Category List Section */}
      <Box>
        <Heading size="md">Food Category List</Heading>
        {isLoggedIn && (
          <Flex justify="right">
            <Button
              colorScheme="blue"
              onClick={() => navigate("/diet/createFoodCategory")}
            >
              Food Category 생성
            </Button>
          </Flex>
        )}
        {foodCategoryList.length > 0 ? (
          <Flex direction="column" gap="10px">
            <Grid
              templateColumns={`repeat(${itemLimit}, 1fr)`}
              p="10px"
              borderRadius="10px"
              gap="10px"
              justifyContent="center"
            >
              {foodCategoryList.map((category) => (
                <Card
                  key={category.categoryIndex}
                  _hover={{ backgroundColor: "gray.500" }}
                >
                  <CardBody>
                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      p="10px"
                      gap="10px"
                      borderRadius="10px"
                    >
                      <Box
                        p="10px"
                        borderRadius="10px"
                        bgColor="gray.200"
                        cursor="pointer"
                        _hover={{ backgroundColor: "gray.400" }}
                      >
                        <Flex direction="column" gap="10px" align="center">
                          {category.categoryImageUrl && (
                            <Image
                              src={category.categoryImageUrl}
                              alt={category.categoryName}
                              boxSize="50px"
                              objectFit="cover"
                            />
                          )}
                          <Text>{category.categoryName}</Text>
                        </Flex>
                      </Box>
                      <Flex direction="column" gap="10px">
                        <Text>카테고리 이름: {category.categoryName}</Text>
                        <Flex justify="right">
                          <IconButton
                            aria-label="Edit category"
                            icon={<EditIcon />}
                            onClick={() =>
                              navigate(
                                `/diet/editFoodCategory/${category.foodCategoryIndex}`
                              )
                            }
                            mr={2}
                          />
                          <IconButton
                            aria-label="Delete category"
                            icon={<DeleteIcon />}
                            onClick={() =>
                              handleDeleteCategory(category.foodCategoryIndex)
                            }
                          />
                        </Flex>
                      </Flex>
                    </Grid>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Flex>
        ) : (
          <Heading fontSize="20px" textAlign="center">
            음식 카테고리가 없습니다
          </Heading>
        )}
      </Box>
    </Flex>
  );
};

export default ViewFoodListForm;
