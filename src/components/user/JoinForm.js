import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Flex, Input, Stack, Heading, Radio, RadioGroup, Select, Center } from '@chakra-ui/react';
import './JoinForm.css';
import Toast from "../chakra/Toast";
import FileUpload from './FileUpload';

const JoinForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [telecom, setTelecom] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    const submitJoin = async (e) => {
        e.preventDefault();

        if (email !== null && email !== '' && (!email.includes('@') || !email.includes('.'))) {
            alert('유효한 이메일 주소를 입력하세요.');
            return;
        }

        const birthRegex = /^(\d{8})$/;
        if(!birthRegex.test(birth)) {
            console.log(birth);
            alert('생년월일은 숫자 8자리를 입력하세요.');
            return;
        }

        if (gender === null || gender === '') {
            alert('성별을 선택하세요.');
            return;
        }

        const phoneRegex = /^(?:\d{3}-\d{4}-\d{4})$/;

        if(!phoneRegex.test(phone)) {
            console.log(phone);
            alert('유효한 휴대폰 번호를 입력하세요.');
            return;
        }

        // if (phone !== null && phone !== '' && !phoneRegex.test(phone)) {
        //     const phoneReg = /^(\d{11})$/;

        //     if(phoneReg.test(phone)) {
        //         const cleaned = ('' + phone).replace(/\D/g, '');

        //         const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        //         if (match) {
        //             // phone = match[1] + '-' + match[2] + '-' + match[3];
        //             const formattedPhone = match[1] + '-' + match[2] + '-' + match[3];

        //             if(!phoneRegex.test(formattedPhone)) {
        //                 // phone = formattedPhone;
        //                 setPhone(formattedPhone);
        //                 console.log(formattedPhone);
        //                 alert('유효한 휴대폰 번호를 입력하세요.1');
        //                 return;
        //             }

        //         } else {
        //             alert('유효한 휴대폰 번호를 입력하세요.2');
        //             return;
        //         }
        //     } else {
        //         alert('유효한 휴대폰 번호를 입력하세요.3');
        //         return;
        //     }
        // } else {
        //     alert('유효한 휴대폰 번호를 입력하세요.4');
        //     return;
        // }

        

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    password: password,
                    email: email,
                    name: name,
                    birth: birth,
                    gender: gender,
                    telecom: telecom,
                    phone: phone
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json();
            console.log('User created: ', result);

            if (result.status === 200) {
                Toast.showSuccess('회원가입 완료');
                navigate('/');
            } else {
                Toast.showFailed('Failed to join');
            }

        } catch (error) {
            console.error('Error: ', error);
        }

        console.log(`${process.env.REACT_APP_SERVER_URL}`);
        console.log(id);
        console.log(password);
        console.log(email);
        console.log(name);
        console.log(birth);
        console.log(gender);
        console.log(telecom);
        console.log(phone);
    };

    useEffect(() => {

    }, []);

    return (
        <Flex backgroundColor="none">
            <Box p={4} textAlign="center">
                <form onSubmit={submitJoin}>
                
                <Stack spacing={4} width="600px" padding="30px" marginBottom="50px" backgroundColor="#BED7DC">
                <Heading as="h2" size="lg" mb={6}>
                    회원가입
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
                    <Button id="submit" type="submit" value="가입" width="150px" height="50px" colorScheme="custom" backgroundColor="#96B6C5">
                            가입
                        </Button>
                    </Flex>

                </Stack>
                </form>
                
            </Box >
        </Flex >
        // <div id="join-container">
        //     <h2>회원가입</h2>
        //     <form method="POST" onSubmit={submitJoin}>
        //         <div>
        //             <label htmlFor="id">아이디</label>
        //             <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
        //         </div>
        //         <div>
        //             <label htmlFor="password">비밀번호</label>
        //             <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        //         </div>
        //         <div>
        //             <label htmlFor="email">이메일</label>
        //             <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //         </div>
        //         <div>
        //             <label htmlFor="name">이름</label>
        //             <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        //         </div>
        //         <div>
        //             <label htmlFor="birth">생년월일</label>
        //             <input type="text" id="birth" value={birth} placeholder="생년월일 8자리" onChange={(e) => setBirth(e.target.value)} required />
        //         </div>
        //         <div>
        //             <label>성별</label>
        //             <div id="radio-container">
        //                 <input type="radio" class="gender" id="gender-man" name="gender" value="M" onChange={(e) => setGender(e.target.value)} />
        //                 <input type="radio" class="gender" id="gender-woman" name="gender" value="F" onChange={(e) => setGender(e.target.value)} />
        //                 <div>
        //                     <label for="gender-man" id="gender-man-label"><div>남자</div></label>
        //                     <label for="gender-woman" id="gender-woman-label"><div>여자</div></label>
        //                 </div>
        //             </div>
        //         </div>
        //         <div>
        //             <label htmlFor="telecom">통신사</label>
        //             <select id="telecom" value={telecom} onChange={(e) => setTelecom(e.target.value)} required>
        //                 <option value="" selected disabled>통신사 선택</option>
        //                 <option value="skt">SKT</option>
        //                 <option value="kt">KT</option>
        //                 <option value="lgt">LGU+</option>
        //             </select>
        //         </div>
        //         <div id="phone-container">
        //             <label htmlFor="phone">휴대폰 번호</label>
        //             <input type="text" id="phone" placeholder="000-0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        //         </div>
        //         <button id="submit" type="submit" value="회원가입">가입</button>
        //     </form>
        // </div>
    );
};

export default JoinForm;
