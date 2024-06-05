import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, FormControl, FormLabel, Flex, Input, Stack, Heading } from '@chakra-ui/react';
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
        // <Flex w="100%">
        //     <Stack w="100%">
        //         <Heading as="h2" size="lg">로그인</Heading>
        //         <form onSubmit={sendLogin}>
        //             <Flex direction="column" gap="50px" justify="center" align="center">
        //             <FormControl>
        //                 <Flex>
        //                     <FormLabel width="100px" fontWeight="bold">아이디</FormLabel>
        //                     <Input
        //                         type="text"
        //                         value={id}
        //                         onChange={(e) => setId(e.target.value)}
        //                         _hover={{ borderColor: "darkgray" }}
        //                         _focus={{
        //                             boxShadow: 'none',
        //                             borderColor: "darkgray"
        //                         }}
        //                     />
        //                 </Flex>
        //             </FormControl>
        //             <FormControl>
        //                 <Flex>
        //                     <FormLabel width="100px" fontWeight="bold">비밀번호</FormLabel>
        //                     <Input
        //                         type="password"
        //                         value={password}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                         _hover={{ borderColor: "darkgray" }}
        //                         _focus={{
        //                             boxShadow: 'none',
        //                             borderColor: "darkgray"
        //                         }}
        //                     />
        //                 </Flex>
        //             </FormControl>

        //             <Flex justify="center" marginBottom="10px">
        //                 <Button width="150px" color="black" onClick={sendLogin}>
        //                     로그인
        //                 </Button>
        //                 <Button as="a" href="./join">
        //                     회원가입
        //                 </Button>
        //             </Flex>
        //             </Flex>
        //         </form>

        //     </Stack>
        // </Flex>
        <Flex backgroundColor="none">
            <Box p={4} textAlign="center">
                <Stack spacing={4} width="600px" padding="30px" marginBottom="50px" backgroundColor="#BED7DC">
                <form onSubmit={sendLogin}>
                <Heading as="h2" size="lg" mb={6}>
                        로그인
                    </Heading>

                    <FormControl id="id" marginTop="20px" marginBottom="10px">
                        <Flex align="center" margin="auto">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">아이디</FormLabel>
                            <Input
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                flex="2"
                                width="400px"
                                maxW="400px"
                                height="35px"
                                backgroundColor="white"
                                borderColor="gray.400"
                                borderWidth="1px"
                                focusBorderColor="gray.400"
                                focusBorderWidth="1px"
                                borderRadius="0"
                                _hover={{ borderColor: "darkgray" }}
                                _focus={{
                                    boxShadow: 'none',
                                    borderColor: "darkgray"
                                }}
                            />
                        </Flex>
                    </FormControl>

                    <FormControl id="password" marginBottom="10px">
                        <Flex align="center">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">비밀번호</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                flex="2"
                                width="400px"
                                maxW="400px"
                                height="35px"
                                backgroundColor="white"
                                borderColor="gray.400"
                                borderWidth="1px"
                                focusBorderColor="gray.400"
                                focusBorderWidth="1px"
                                borderRadius="0"
                                _hover={{ borderColor: "darkgray" }}
                                _focus={{
                                    boxShadow: 'none',
                                    borderColor: "darkgray"
                                }}
                            />
                        </Flex>
                    </FormControl>

                    <Flex justify="center" marginBottom="15px">
                        <Button width="150px" height="50px" marginRight="15px" colorScheme="custom" backgroundColor="#FBF3D5" color="black" onClick={sendLogin}>
                            로그인
                        </Button>
                        <Button as="a" width="150px" height="50px" colorScheme="custom" backgroundColor="#96B6C5" href="./join">
                            회원가입
                        </Button>
                    </Flex>
                </form>
                    
                </Stack>
            </Box>
        </Flex>
    );
};

export default LoginForm;
