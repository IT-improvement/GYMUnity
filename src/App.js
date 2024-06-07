import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router"
import Context from "./Context";
import Toast from "./components/chakra/Toast";

const prevLoginStatusMap = {
	none: "none",
	login: "login",
	logout: "logout",
};

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(window.sessionStorage.getItem("userCode") ? true : false);
	const [sessionUser, setSessionUser] = useState({
		code: window.sessionStorage.getItem("userCode") ? window.sessionStorage.getItem("userCode") : "",
		id: window.sessionStorage.getItem("userId") ? window.sessionStorage.getItem("userId") : "",
		profileImage: window.sessionStorage.getItem("userProfileImage") ? window.sessionStorage.getItem("userProfileImage") : "",
	});
	const [prevLoginStatus, setPrevLoginStatus] = useState(prevLoginStatusMap.none);

	const handleSessionUserChange = (userCode = "", userId = "", userProfileImage = "") => {
		setSessionUser({
			code: userCode,
			id: userId,
			profileImage: userProfileImage,
		});
	};

	const handleLoginSuccess = (userCode, userId, userProfileImage) => {
		handleSessionUserChange(userCode, userId, userProfileImage);

		setIsLoggedIn(true);
		setPrevLoginStatus(prevLoginStatusMap.login);
	};

	const handleLogoutSuccess = () => {
		handleSessionUserChange();

		setIsLoggedIn(false);
		setPrevLoginStatus(prevLoginStatusMap.logout);
	};

	useEffect(() => {
		window.sessionStorage.setItem("userCode", sessionUser.code);
		window.sessionStorage.setItem("userId", sessionUser.id);
		window.sessionStorage.setItem("userProfileImage", sessionUser.profileImage);
	}, [sessionUser]);

	useEffect(() => {
		if (prevLoginStatus !== prevLoginStatusMap.none) {
			if (isLoggedIn)
				Toast.showSuccess("로그인 성공");
			else
				Toast.showInfo("로그아웃 성공");
		}
	}, [isLoggedIn]);

	return (
		<Context.Provider value={{ isLoggedIn, sessionUser, handleLoginSuccess, handleLogoutSuccess }}>
			<RouterProvider router={router} />
		</Context.Provider>
	);
}

export default App;