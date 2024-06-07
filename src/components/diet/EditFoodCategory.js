import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const EditFoodCategory = () => {
  const { foodCategoryIndex } = useParams();
  const [category, setCategory] = useState({
    name: "",
    imageUrl: "",
  });
  const { isLoggedIn, sessionUser } = useContext(Context);
  const navigate = useNavigate();

  const fetchCategoryDetails = () => {
    console.log(foodCategoryIndex);
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=readDetailFoodCategory&foodCategoryIndex=${foodCategoryIndex}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategory({
          name: data.categoryName,
          imageUrl: data.categoryImageUrl,
        });
      })
      .catch(() => Toast.showFailed("음식 카테고리 정보 불러오기 실패"));
  };

  const fetchCategoryUpdate = () => {
    let isUpdated = false;
    console.log("userCode:" + sessionUser.code);
    console.log("categoryIndex:" + foodCategoryIndex);
    console.log("categoryName:" + category.name);
    console.log("categoryImageUrl:" + category.imageUrl);

    const requestBody = {
      userCode: sessionUser.code,
      foodCategoryIndex: foodCategoryIndex,
      categoryName: category.name,
      categoryImageUrl: category.imageUrl,
    };

    fetch(
      `${process.env.REACT_APP_SERVER_URL}/foodCategory/service?command=updateFoodCategory`,
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
        if (data.status === 200) isUpdated = true;
      })
      .finally(() => {
        Toast.show(
          isUpdated,
          "음식 카테고리 수정 성공",
          "음식 카테고리 수정 실패"
        );

        if (isUpdated) navigate(`/diet/foodList`);
      });
  };

  const handleCategoryFieldOnChange = (e) => {
    setCategory((oldCategory) => {
      return { ...oldCategory, [e.target.name]: e.target.value };
    });
  };

  const handleCategoryUpdateOnSubmit = (e) => {
    e.preventDefault();
    fetchCategoryUpdate();
  };

  useEffect(() => {
    if (!isLoggedIn) navigate("/diet");

    fetchCategoryDetails();
  }, [isLoggedIn, navigate, foodCategoryIndex]);

  return (
    <Flex w="100%" justify="center">
      <form
        style={{ minWidth: "70%" }}
        method="POST"
        onSubmit={handleCategoryUpdateOnSubmit}
      >
        <FormControl>
          <FormLabel>카테고리 이름</FormLabel>
          <Input
            isRequired
            type="text"
            name="name"
            value={category.name}
            onChange={handleCategoryFieldOnChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>카테고리 이미지 URL</FormLabel>
          <Input
            type="text"
            name="imageUrl"
            value={category.imageUrl}
            onChange={handleCategoryFieldOnChange}
          />
        </FormControl>
        <Flex justify="space-between">
          <Button colorScheme="blue" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
          <Button type="submit" colorScheme="green">
            수정
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default EditFoodCategory;
