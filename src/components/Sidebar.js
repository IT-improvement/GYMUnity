import { useContext, useEffect } from "react";
import { VStack, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Context from "../Context";

const Sidebar = () => {
  const { isLoggedIn } = useContext(Context);

  const menuItems = [
    {
      name: "피드",
      link: "/feed",
    },
    {
      name: "운동법",
      link: "/exercises",
    },
  ];

  const menuItemsWhenLoggedIn = [
    ...menuItems,
    {
      name: "다이어리",
      link: "/diary",
    },
    {
      name: "루틴",
      link: "/routine",
    },
    {
      name: "친구 목록",
      link: "/friends",
    },
    {
      name: "마이페이지",
      link: "/user/mypage",
    },
    {
      name: "식단표",
      link: "/routineDiet",
    },
    {
      name: "식단 메뉴 관리",
      link: "/diet/foodList",
    },
  ];

  const showMenuItems = () => {
    const items = isLoggedIn ? menuItemsWhenLoggedIn : menuItems;

    return items.map((item) => (
      <Box key={item.link}
        w="100%"
        p="10px"
        textAlign="center"
        _hover={{ bgColor: "rgb(150, 197, 210)" }}
      /*  _hover={{ bgColor: "gray.500", color: "gray.100", borderRadius: "10px" }}*/
      >
        <Link to={item.link}>
          <Text fontWeight="bold">{item.name}</Text>
        </Link>
      </Box>
    ));
  };

  useEffect(() => {
    showMenuItems();
  }, [isLoggedIn]);

   	/*<VStack minW="200px" p="10px" bgColor="gray.200">*/
  return (
    <VStack minW="200px" p="10px" bgColor="rgb(175, 204, 212)">
      {showMenuItems()}
    </VStack>
  );
};

export default Sidebar;
