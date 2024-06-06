import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Context from "../../Context";
import Toast from "../chakra/Toast";

const ButtonLogout = () => {
    const { handleLogoutSuccess } = useContext(Context);
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
                navigate("/");
            }
        })
        .catch(() => {
            Toast.showFailed("로그아웃 실패");
        })
    };

    return (
        <Link onClick={handleLogout} style={{fontSize: '25px'}}>• 로그아웃</Link>
    );
};

export default ButtonLogout;