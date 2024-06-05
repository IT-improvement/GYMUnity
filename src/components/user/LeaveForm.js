import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Flex, Input, Stack, Heading, Text, Radio, RadioGroup, Select, Center, Checkbox } from '@chakra-ui/react';
import "./LeaveForm.css";
import Context from '../../Context';
import Toast from "../chakra/Toast";

const LeaveForm = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const { code } = useParams();
    const [user, setUser] = useState(true);
    const navigate = useNavigate();
    const { isLoggedIn, sessionUser, handleLogoutSuccess } = useContext(Context);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const submitLeave = async (e) => {
        e.preventDefault();

        if (!password) {
            alert('비밀번호 입력은 필수입니다.');
            return;
        }
        if (!isChecked) {
            alert('탈퇴 확인 체크는 필수입니다.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=leave`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            console.log(response);
            const result = await response.json();
            // let result = null;
            // try {
            //     result = await response.json();
            // } catch (error) {
            //     console.error('Error parsing JSON response:', error);
            //     throw new Error('Failed to parse JSON response');
            // }

            console.log('User leave: ', result);

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

            if (result.status === 200) {
                Toast.showSuccess('회원탈퇴 완료');
                navigate('/');
            } else {
                Toast.showFailed('비밀번호가 일치하지 않습니다.');
            }

        } catch (error) {
            console.error('Error: ', error);
        }

        console.log(`${process.env.REACT_APP_SERVER_URL}`);
        console.log(id);
        console.log(password);
    }

    useEffect(() => {
        console.log(code);
        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=read_one&code=${sessionUser.code}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                console.log(data);
                console.log(code);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [code]);

    if (!user) {
        console.log('해당 유저를 불러오는 중..');
    }

    return (
        <Flex backgroundColor="none">
            <Box p={4} textAlign="center">
                <Heading as="h2" size="lg" mb={6}>
                    회원탈퇴
                </Heading>
                <form method="DELETE" onSubmit={submitLeave}>
                    <Stack spacing={4} width="600px" padding="30px" marginBottom="50px" backgroundColor="#BED7DC">
                        <FormControl id="id" marginTop="20px" marginBottom="10px">
                            <Flex align="center" margin="auto">
                                <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">아이디</FormLabel>
                                <span>{user.id}</span>
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
                        <FormControl id="confirm" marginBottom="10px">
                            <Flex align="center">
                                <Checkbox
                                    type="checkbox"
                                    id="check-box"
                                    width="25px"
                                    height="25px"
                                    backgroundColor="white"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <FormLabel htmlFor="check-box">
                                    <Text>탈퇴를 확인합니다.</Text>
                                </FormLabel>
                            </Flex>
                            </FormControl>
                            <Flex justify="center" marginBottom="10px" mb="10px">
                            <Button id="submit-btn" type="submit" value="회원탈퇴" colorScheme="custom" backgroundColor="#96B6C5" width="150px" height="50px">탈퇴</Button>
                            </Flex>
                    </Stack>
                </form>
            </Box>
        </Flex>
        // <div id="leave-container">
        //     <h2>회원탈퇴</h2>
        //     <form method="DELETE" onSubmit={submitLeave}>
        //         <div>
        //             <div id="id" style={{ marginTop: '20px', marginBottom: '10px' }}>
        //                 <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
        //                     <label style={{ width: '100px', paddingLeft: '5px', fontWeight: 'bold' }}>아이디</label>
        //                     <span>{user.id}</span>
        //                 </div>
        //             </div>
        //         </div>
        //         <div>
        //             <label htmlFor="password">비밀번호</label>
        //             <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        //         </div>
        //      <div id="confirm">
        //                 <input type="checkbox" id="check-box" checked={isChecked} onChange={handleCheckboxChange} />
        //                 <label id="check-label"><span>탈퇴를 확인합니다.</span></label>
        //         </div>
        //         <button id="submit" type="submit" value="회원탈퇴">탈퇴</button>
        //     </form>

        // </div>
    );
};

export default LeaveForm;
