import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Flex, Input, Stack, Heading, Radio, RadioGroup, Select, Center, Avatar } from '@chakra-ui/react';
import axios from 'axios';

const UpdateUserForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [telecom, setTelecom] = useState("");
    const [phone, setPhone] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const fetchUserData = async () => {
        const response = await fetch('http://localhost:8080/user');
        const userData = await response.json();

        setId(userData.id);
        setPassword(userData.password);
        setEmail(userData.name);
        setName(userData.name);
        setBirth(userData.birth);
        setGender(userData.gender);
        setTelecom(userData.telecom);
        setPhone(userData.phone);
        setProfileImage(userData.profileImage);
    };

    const handleImageClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (f) => {
                console.log(f.target);
                const dataUrl = reader.result;
                setProfileImage(dataUrl);
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    const sendUpdate = async () => {
        const response = await axios.post('', {
            id,
            password,
            email,
            name,
            birth,
            gender,
            telecom,
            phone,
            profileImage
        });
        console.log('Join button clicked');
        console.log('Username:', id);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <Center backgroundColor="none">
            <Box p={4} textAlign="center">
                <Heading as="h2" size="lg" mb={6}>
                    회원정보 수정
                </Heading>
                <Stack spacing={4} width="600px" padding="30px" marginBottom="50px" backgroundColor="#BED7DC">
                    <Flex justify="center">
                        <Avatar id="image-container" type="file" size="xl" width="150px" height="150px" showName={false} bg="gray.300" src={profileImage} onClick={handleImageClick} />
                    </Flex>
                    <FormControl id="id" marginTop="20px" marginBottom="10px">
                        <Flex align="center" margin="auto">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">아이디</FormLabel>
                            <span>{id}</span>
                            {/* <Input
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
                            /> */}
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

                    <FormControl id="email" marginBottom="10px">
                        <Flex align="center">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">이메일</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                    <FormControl id="name" marginBottom="10px">
                        <Flex align="center">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">이름</FormLabel>
                            <Input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                readOnly
                            />
                        </Flex>
                    </FormControl>

                    <FormControl id="birth" marginBottom="10px">
                        <Flex align="center">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">생년월일</FormLabel>
                            <Input
                                type="birth"
                                value={birth}
                                onChange={(e) => setBirth(e.target.value)}
                                flex="2"
                                width="400px"
                                maxW="400px"
                                height="35px"
                                placeholder="생년월일 8자리"
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
                                readOnly
                            />
                        </Flex>
                    </FormControl>

                    <FormControl id="gender" marginBottom="10px">
                        <Flex align="center">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">성별</FormLabel>
                            <RadioGroup onChange={setGender} value={gender}
                                flex="2"
                                width="400px"
                                maxW="400px"
                                height="35px"
                                backgroundColor="white"
                                borderColor="gray.400"
                                borderWidth="1px">
                                <Flex height="100%">
                                    <Box value="M"
                                        onClick={() => setGender('M')}
                                        justifyContent="center"
                                        width="200px"
                                        bg={gender === "M" ? "#D3D3D3" : "inherit"}
                                        borderRight="1px solid lightgray"
                                        _hover={{ cursor: 'pointer' }}
                                    >
                                        <Radio value="M"
                                            style={{ display: 'none' }}
                                            isDisabled={true}
                                        >
                                            <span style={{ fontWeight: gender === "M" ? "bold" : "normal", textAlign: "center" }}>남</span>
                                        </Radio>
                                    </Box>
                                    <Box value="F"
                                        onClick={() => setGender('F')}
                                        justifyContent="center"
                                        width="200px"
                                        bg={gender === "F" ? "#D3D3D3" : "inherit"}
                                        _hover={{ cursor: 'pointer' }}
                                    >
                                        <Radio value="F"
                                            style={{ display: 'none' }}
                                            isDisabled={true}
                                        >
                                            <span style={{ fontWeight: gender === "F" ? "bold" : "normal", textAlign: "center" }}>여</span>
                                        </Radio>
                                    </Box>
                                </Flex>
                            </RadioGroup>
                        </Flex>
                    </FormControl>

                    <FormControl id="telecom" marginBottom="10px">
                        <Flex align="center">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">통신사</FormLabel>
                            <Select
                                placeholder="통신사 선택"
                                value={telecom}
                                onChange={(e) => setTelecom(e.target.value)}
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
                            >
                                <option value="skt">SKT</option>
                                <option value="kt">KT</option>
                                <option value="lgt">LGU+</option>
                            </Select>
                        </Flex>
                    </FormControl>

                    <FormControl id="phone" marginBottom="20px">
                        <Flex align="center">
                            <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">휴대폰 번호</FormLabel>
                            <Input
                                type="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                flex="2"
                                width="400px"
                                maxW="400px"
                                height="35px"
                                placeholder="000-0000-0000"
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
                        <Button width="150px" height="50px" colorScheme="custom" backgroundColor="#96B6C5" onClick={sendUpdate}>
                            완료
                        </Button>
                    </Flex>

                </Stack>
            </Box >
        </Center >
    );
};

export default UpdateUserForm;