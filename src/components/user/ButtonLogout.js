import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";

const ButtonLogout = () => {
    const { isLoggedIn, handleLogoutSuccess } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        let isLoggedOut = false;

        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=logout`, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                isLoggedOut = true;
                handleLogoutSuccess();
            }
        })
        .catch(() => {
            Toast.showFailed("로그아웃 실패");
        })
    };

    const navgiateToLoginPage = () => {
        navigate("/user/login")
    };

    return (
        <Flex>
            {isLoggedIn ?
                <Button colorScheme="red" onClick={handleLogout}>로그아웃</Button>
                :
                navgiateToLoginPage()
            }
        </Flex>
    );
};

export default ButtonLogout;