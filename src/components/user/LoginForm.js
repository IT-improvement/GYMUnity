import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Flex, Input, Stack, Heading } from '@chakra-ui/react';
import Context from "../../Context";
import Toast from "../chakra/Toast";

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, handleLoginSuccess } = useContext(Context);
    const navigate = useNavigate();

    const sendLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                password: password
            })
        });

        if (response.status === 200) {
            const result = await response.json();
            handleLoginSuccess(result.code, id);
            navigate('/');
        } else {
            Toast.showFailed("로그인 실패");
        }
    };

    useEffect(() => {
        if (isLoggedIn)
            navigate("/");
    }, []);

    return (
        <Flex w="100%" p="10px">
            <Stack w="100%">
                <Heading as="h2" size="lg">로그인</Heading>
                <form onSubmit={sendLogin}>
                    <Flex direction="column" gap="50px" justify="center" align="center">
                    <FormControl>
                        <Flex justify="center">
                            <FormLabel width="100px" fontWeight="bold">아이디</FormLabel>
                            <Input type="text" value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <Flex justify="center">
                            <FormLabel width="100px" fontWeight="bold">비밀번호</FormLabel>
                            <Input
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </Flex>
                    </FormControl>

                    <Flex justify="center" gap="10px">
                        <Button colorScheme="green" onClick={sendLogin}>
                            로그인
                        </Button>
                        <Button colorScheme="blue" href="./join">
                            회원가입
                        </Button>
                    </Flex>
                    </Flex>
                </form>

            </Stack>
        </Flex>
    );
};

export default LoginForm;