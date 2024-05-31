import React, { useState, useContext } from 'react';
import Context from "../../Context";

const LogoutForm = () => {
    const { isLoggedIn, userCode, setIsLoggedIn, setUserCode } = useContext(Context);

    const handleLogout = () => {
        console.log('로그아웃 ?1');
        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=logout`, {
            method: "GET", 
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status === 200) {
                alert('로그아웃 성공');
                setUserCode();
                setIsLoggedIn(false);
            }

        })
        .catch(() => {
            console.log('에러');
        });
    };

    return (
        <div>
            {isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
            ) : (
                <p>로그아웃되었습니다.</p>
            )}
        </div>
    );
};

export default LogoutForm;