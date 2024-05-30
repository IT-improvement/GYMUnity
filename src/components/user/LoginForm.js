import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Flex, Input, Stack, Heading, Radio, RadioGroup, Select, Center } from '@chakra-ui/react';
import axios from 'axios';

const LoginForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const sendLogin = async () => {
        const response = await axios.post('', {
            id,
            password
        });
    };

    return (
        <Center backgroundColor="none">
            <Box p={4} textAlign="center">
                

                <Stack spacing={4} width="600px" padding="30px" marginBottom="50px" backgroundColor="#BED7DC">
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

                    <Flex justify="center" marginBottom="10px">
                <Button width="150px" height="50px" marginRight="15px" colorScheme="custom" backgroundColor="#FBF3D5" color="black" onClick={sendLogin}>
                    로그인
                </Button>
                <Button as="a" width="150px" height="50px" colorScheme="custom" backgroundColor="#96B6C5" color="black" href="./join">
                    회원가입
                </Button>
            </Flex>
                </Stack>
            </Box>
        </Center>
    );
};

export default LoginForm;