import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const CreateFood = () => {
  const [food, setFood] = useState({
    categoryIndex: "",
    name: "",
    protein: "",
    calory: "",
    carbs: "",
    size: "",
  });
  const [foodCategories, setFoodCategories] = useState([]);
  const { isLoggedIn, sessionUser } = useContext(Context);
  const navigate = useNavigate();

  const fetchFoodCategories = () => {
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=readAllFoodCategory&userCode=${sessionUser.code}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => setFoodCategories(data))
      .catch(() => Toast.showFailed("음식 카테고리 불러오기 실패"));
  };

  const fetchFoodCreate = () => {
    let isCreated = false;
    const requestBody = {
      userCode: sessionUser.code,
      foodCategoryIndex: food.categoryIndex,
      foodName: food.name,
      protein: food.protein,
      calory: food.calory,
      carbs: food.carbs,
      size: food.size,
    };

    fetch(
      `${process.env.REACT_APP_SERVER_URL}/food/service?command=createFood`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionUser.code,
        },
        body: JSON.stringify(requestBody),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) isCreated = true;
      })
      .finally(() => {
        Toast.show(isCreated, "음식 작성 성공", "음식 작성 실패");

        if (isCreated) navigate("/diet");
      });
  };

  const handleFoodFieldOnChange = (e) => {
    setFood((oldFood) => {
      return { ...oldFood, [e.target.name]: e.target.value };
    });
  };

  const handleFoodCreateOnSubmit = (e) => {
    e.preventDefault();
    fetchFoodCreate();
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/diet");

    fetchFoodCategories();
  }, [isLoggedIn, navigate]);

  return (
    <Flex w="100%" justify="center">
      <form
        style={{ minWidth: "70%" }}
        method="POST"
        onSubmit={handleFoodCreateOnSubmit}
      >
        <FormControl>
          <FormLabel>음식 카테고리</FormLabel>
          <Select
            required
            name="categoryIndex"
            defaultValue={-1}
            onChange={handleFoodFieldOnChange}
          >
            <option value={-1} disabled>
              카테고리 선택
            </option>
            {foodCategories.map((category) => (
              <option
                key={category.foodCategoryIndex}
                value={category.foodCategoryIndex}
              >
                {category.categoryName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>음식 이름</FormLabel>
          <Input
            isRequired
            type="text"
            name="name"
            value={food.name}
            onChange={handleFoodFieldOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>단백질 (g)</FormLabel>
          <Input
            isRequired
            type="number"
            name="protein"
            value={food.protein}
            onChange={handleFoodFieldOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>칼로리 (kcal)</FormLabel>
          <Input
            isRequired
            type="number"
            name="calory"
            value={food.calory}
            onChange={handleFoodFieldOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>탄수화물 (g)</FormLabel>
          <Input
            isRequired
            type="number"
            name="carbs"
            value={food.carbs}
            onChange={handleFoodFieldOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>양 (g)</FormLabel>
          <Input
            isRequired
            type="number"
            name="size"
            value={food.size}
            onChange={handleFoodFieldOnChange}
          />
        </FormControl>
        <Flex justify="space-between">
          <Button colorScheme="blue" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
          <Button type="submit" colorScheme="green">
            작성
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default CreateFood;
