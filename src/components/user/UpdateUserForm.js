import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Flex, Input, Stack, Heading, Radio, RadioGroup, Select, Center, Avatar } from '@chakra-ui/react';
import Context from "../../Context";
import Toast from "../chakra/Toast";
import FileUpload from './FileUpload';

const UpdateUserForm = () => {
    const { code } = useParams();
    const [user, setUser] = useState({
        id: "",
        password: "",
        email: "",
        name: "",
        birth: "",
        gender: "",
        telecom: "",
        phone: "",
        profileImage: ""
    })
    // const [user, setUser] = useState(true);
    // const [id, setId] = useState("");
    // const [password, setPassword] = useState("");
    // const [email, setEmail] = useState("");
    // const [name, setName] = useState("");
    // const [birth, setBirth] = useState("");
    // const [gender, setGender] = useState("");
    // const [telecom, setTelecom] = useState("");
    // const [phone, setPhone] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();
    
    const sendUpdate = async (e) => {
        e.preventDefault();

        // if (id === null || id === '')
        //     setId(user.id);
        // if (password === null || password === '')
        //     setPassword(user.password);
        // if (name === null || name === '')
        //     setName(user.name);
        // if (email === null || email === '')
        //     setEmail(user.email);
        // if (telecom === null || telecom === '')
        //     setTelecom(user.telecom);
        // if (phone === null || phone === '')
        //     setPhone(user.phone);
        // if (profileImage === null || profileImage === '')
        //     setProfileImage(user.profileImage);
        // setBirth(user.birth);
        // setGender(user.gender);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user.id,
                    password: user.password,
                    email: user.email,
                    name: user.name,
                    birth: user.birth,
                    gender: user.gender,
                    telecom: user.telecom,
                    phone: user.phone,
                    profileImage: user.profileImage
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const result = await response.json();
            console.log('User data updated: ', result);

            if (result.status === 200) {
                Toast.showSuccess('회원정보 수정 완료');
                navigate('/');
            } else {
                alert('Failed to update');
            }
        } catch (error) {
            console.error('Error: ', error);
        }

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
    };

    const handleUserDataOnChange = (e) => {
        setUser(oldUser => {
            return {...oldUser, [e.target.name]: e.target.value}
        });
    };

    const handleFileOnChange = (fileBase64) => {
        setUser(oldUser => {
            return { ...oldUser, profileImage: fileBase64}
        });
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
                setUser(data)
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [code]);

    //     fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=read_one&code=${sessionUser.code}`, {
    //         method: "POST",
    //         headers: {
    //         'Content-Type': 'application/json'
    //         },
    //     })
    //         .then(response => {
    //             console.log(response);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch user');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setUser(data)
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [code]);

    if (!user) {
        return <div>로딩 중...</div>;
    }
    
    return (
        <Center backgroundColor="none">
            <Box p={4} textAlign="center">
                <Heading as="h2" size="lg" mb={6}>
                    회원정보 수정
                </Heading>
                <form onSubmit={sendUpdate}>
                    <Stack spacing={4} width="600px" padding="30px" marginBottom="50px" backgroundColor="#BED7DC">
                        <Flex justify="center">
                            <Avatar id="image-container" type="file" size="xl" width="150px" height="150px" showName={false} bg="gray.300" src={profileImage} onClick={handleImageClick} />
                            <FileUpload handleFileOnChange={handleFileOnChange} src={user.profileImage} value={user.profileImage} />
                        </Flex>
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
                                    value={user.password}
                                    onChange={(e) => handleUserDataOnChange(e)}
                                    name="password"
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
                                    value={user.email}
                                    onChange={(e) => handleUserDataOnChange(e)}
                                    name="email"
                                    placeholder={user.email}
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
                                    value={user.name}
                                    // onChange={(e) => setName(e.target.value)}
                                    onChange={(e) => handleUserDataOnChange(e)}
                                    name="name"
                                    placeholder={user.name}
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
                                    value={user.birth}
                                    // onChange={(e) => setBirth(e.target.value)}
                                    onChange={(e) => handleUserDataOnChange(e)}
                                    name="birth"
                                    placeholder={user.birth}
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

                        <FormControl id="gender" marginBottom="10px">
                            <Flex align="center">
                                <FormLabel width="100px" paddingLeft="5px" fontWeight="bold">성별</FormLabel>
                                <RadioGroup value={user.gender} placeholder={user.gender}
                                    flex="2"
                                    width="400px"
                                    maxW="400px"
                                    height="35px"
                                    backgroundColor="white"
                                    borderColor="gray.400"
                                    borderWidth="1px">
                                    <Flex height="100%">
                                        <Box value="M"
                                            // onClick={() => setGender('M')}
                                            justifyContent="center"
                                            width="200px"
                                            bg={user.gender === "M" ? "#D3D3D3" : "inherit"}
                                            borderRight="1px solid lightgray"
                                            _hover={{ cursor: 'pointer' }}
                                        >
                                            <Radio value="M"
                                                style={{ display: 'none' }}
                                                isDisabled={true}
                                            >
                                                <span style={{ fontWeight: user.gender === "M" ? "bold" : "normal", textAlign: "center" }}>남</span>
                                            </Radio>
                                        </Box>
                                        <Box value="F"
                                            // onClick={() => setGender('F')}
                                            justifyContent="center"
                                            width="200px"
                                            bg={user.gender === "F" ? "#D3D3D3" : "inherit"}
                                            _hover={{ cursor: 'pointer' }}
                                        >
                                            <Radio value="F"
                                                style={{ display: 'none' }}
                                                isDisabled={true}
                                            >
                                                <span style={{ fontWeight: user.gender === "F" ? "bold" : "normal", textAlign: "center" }}>여</span>
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
                                    value={user.telecom}
                                    onChange={(e) => handleUserDataOnChange(e)}
                                    name="telecom"
                                    placeholder="통신사를 선택하세요"
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
                                    value={user.phone}
                                    onChange={(e) => handleUserDataOnChange(e)}
                                    name="phone"
                                    placeholder={user.phone}
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

                        <Flex justify="center" marginBottom="10px" mb="10px">
                            <Button id="submit" type="submit" value="수정" width="150px" height="50px" colorScheme="custom" backgroundColor="#96B6C5">
                                완료
                            </Button>
                        </Flex>
                    </Stack>
                </form>

            </Box >
        </Center >
    );
};

export default UpdateUserForm;
