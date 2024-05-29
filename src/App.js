import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const Context = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const showToast = () => {
    toast({
      title: `${isLoggedIn ? "로그인" : "로그아웃"} 성공`,
      duration: 1500,
      status: `${isLoggedIn ? "success" : "info"}`,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    showToast();

    if (isLoggedIn) window.sessionStorage.setItem("userCode", "1001");
    else window.sessionStorage.removeItem("userCode");
  }, [isLoggedIn]);

  return (
    <Context.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
