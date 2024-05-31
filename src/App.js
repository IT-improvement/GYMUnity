import { RouterProvider } from "react-router-dom";
import router from './router'
import { useState, createContext, useEffect } from "react";
import { useToast } from '@chakra-ui/react'
import Context from "./Context";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(window.sessionStorage.getItem("userCode") ? true : false);
	const [userCode, setUserCode] = useState();
	const toast = useToast();

	// const showToast = () => {
	// 	toast({
	// 		title: `${isLoggedIn ? "로그인" : "로그아웃"} 성공`,
	// 		status: `${isLoggedIn ? "success" : "info"}`,
	// 		duration: 1500,
	// 		isClosable: true,
	// 		position: "top",
	// 	});
	// };

	useEffect(() => {
		// showToast();

		if (userCode) {
			window.sessionStorage.setItem("userCode", userCode);
		if (isLoggedIn) {
			const tempUserCode = 1001;
			window.sessionStorage.setItem("userCode", tempUserCode);
			setUserCode(tempUserCode);
		}
		else {
			window.sessionStorage.removeItem("userCode");
			setUserCode();
		}
	}, [userCode]);

	return (
		<Context.Provider value={{ isLoggedIn, setIsLoggedIn, userCode, setUserCode }}>
			<RouterProvider router={router} />
		</Context.Provider>
	);
}

export default App;