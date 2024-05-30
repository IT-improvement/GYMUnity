import { RouterProvider } from "react-router-dom";
import router from './router'
import { useState, createContext, useEffect } from "react";
import { useToast } from '@chakra-ui/react'

export const Context = createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
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

    if (isLoggedIn)
      window.sessionStorage.setItem("userCode", "1004");
    else
      window.sessionStorage.removeItem("userCode");
  }, [isLoggedIn]);

  return (
    <Context.Provider value={[isLoggedIn, setLoggedIn]}>
      <RouterProvider router={router}/>
    </Context.Provider>
  );
}

export default App;