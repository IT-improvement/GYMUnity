import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import Context from "../../Context";
import LoadingSpinner from "../chakra/LoadingSpinner";
import Toast from "../chakra/Toast";

const ViewFoodDetailForm = () => {
  const { foodIndex } = useParams();
  const [food, setFood] = useState(null);
  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, sessionUser } = useContext(Context);
  const navigate = useNavigate();

  const fetchFoodDetail = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/food/service?command=readDetailFood&foodIndex=${foodIndex}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setFood(data);
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
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    let isDeleted = false;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/food/service?command=deleteFood&foodIndex=${food.foodIndex}`,
        {
          method: "POST",
          headers: {
            Authorization: sessionUser.code,
          },
        }
      );

      const data = await response.json();
      if (data.status === 200) {
        isDeleted = true;
      }
    } catch {
      isDeleted = false;
    } finally {
      Toast.show(isDeleted, "음식 삭제 성공", "음식 삭제 실패");

      if (isDeleted) {
        navigate("/diet/foodList");
      }
    }
  };

  const getCategoryName = (categoryIndex) => {
    const category = foodCategoryList.find(
      (cat) => cat.foodCategoryIndex === categoryIndex
    );
    return category ? category.categoryName : "Unknown Category";
  };

  useEffect(() => {
    if (sessionUser) {
      fetchFoodDetail();
      fetchFoodCategoryList();
    }
  }, [foodIndex, sessionUser]);

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

  if (!food) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text color="red.500">음식을 찾을 수 없습니다</Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" w="100%" p="10px">
      <Flex direction="column" w="100%" p="10px" gap="30px" bgColor="gray.50">
        <Heading>음식 상세 정보</Heading>
        <Flex w="100%" gap="10px">
          <Card w="100%">
            <CardBody>
              <Flex align="center" justify="space-between">
                <Text>음식 이름: {food.foodName}</Text>
                <Text>카테고리: {getCategoryName(food.foodCategoryIndex)}</Text>
                <Text>작성일: {food.createDate}</Text>
                {food.modDate && <Text>수정일: {food.modDate}</Text>}
                {isLoggedIn && (
                  <Flex gap="10px">
                    <Button
                      colorScheme="blue"
                      onClick={() =>
                        navigate(`/diet/editFood/${food.foodIndex}`)
                      }
                    >
                      수정
                    </Button>
                    <Button colorScheme="red" onClick={handleDelete}>
                      삭제
                    </Button>
                  </Flex>
                )}
              </Flex>
            </CardBody>
          </Card>
        </Flex>

        <Flex direction="column" gap="10px">
          <Card>
            <CardBody>
              <Image
                src={food.foodCategoryImageUrl}
                alt={food.foodName}
                boxSize="150px"
                objectFit="cover"
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Text>단백질: {food.protein}</Text>
              <Divider borderWidth="2px" m="5px 0px" />
              <Text>칼로리: {food.calory}</Text>
              <Divider borderWidth="2px" m="5px 0px" />
              <Text>탄수화물: {food.carbs}</Text>
              <Divider borderWidth="2px" m="5px 0px" />
              <Text>양: {food.size}</Text>
            </CardBody>
          </Card>
        </Flex>
      </Flex>

      <Box>
        <Button colorScheme="blue" onClick={() => navigate("/diet/foodList")}>
          목록으로 돌아가기
        </Button>
      </Box>
    </Flex>
  );
};

export default ViewFoodDetailForm;
