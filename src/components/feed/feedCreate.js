import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Center, Avatar, Badge, Card, CardBody, useToast, Flex, Box, Select, Heading, FormControl, FormLabel, Button, Text, Input } from "@chakra-ui/react";
import Context from "../../Context";
import Toast from "../chakra/Toast";
import FileUpload from "./FileUpload";

const FeedCreate = () => {
    const [feed, setFeed] = useState({
        title: "",
        content: "",
        image: "",
    });

    const [user, setUser] = useState({
        code: undefined,
        profileImage: "",
        id: "",
        name: "",
    });

    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();
    console.log(feed.title)
    console.log(feed.content)
    const fetchFeedCreate = () => {
        let isCreate = false;
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed?command=feedCreate&title=${feed.title}&content=${feed.content}`, {
            method: "POST",
            headers: {
                "Authorization": sessionUser.code,
            },
            body: JSON.stringify({
                image: feed.image
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === 200)
                    isCreate = true;
            })
            .finally(() => {
                Toast.show(isCreate, "피드 생성 성공", "피드 생성 실패");
                navigate("/feed")
            });
    }

    const fetchUser = () => {
        const code = sessionUser;
        console.log(code.code);
        fetch(`${process.env.REACT_APP_SERVER_URL}/user?command=read_one&code=${code.code}`, {
            method: "GET", 
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
        .catch(() => {
            Toast.showFailed("유저 페이지 로드 실패");
        });
    };





    const handleFeedCreateOnSubmit = (e) => {
        e.preventDefault();
        fetchFeedCreate();
        console.log("on sumbi9t");
    };

    const handleFeedFieldOnChange = (e) => {
        setFeed(oldFeed => {
            return { ...oldFeed, [e.target.name]: e.target.value };
        });
    };

    const handleFileOnChange = (file) => {
        setFeed(oldFeed => {
            return { ...oldFeed, image: file }
        })
    }

    useEffect(() => {
        fetchUser();
    }, []);

    console.log(user)

    return (
        <Card>
            <form method="POST" onSubmit={handleFeedCreateOnSubmit}>
                <Center>
                <Flex w="50%">
                <CardBody>
                    <Flex direction="column" p="10px" gap="10px" borderRadius="10px" bgColor="gray.300">
                        <Card _hover={{ backgroundColor: "gray.400" }}>
                            <CardBody>
                                <Flex gap="10px">
                                    <Image src={user.profileImage}/>
                                    <Flex direction="column">
                                        <Text>{user.name}</Text>
                                        <Badge fontSize="15px" colorScheme="pink">
                                            {user.id}
                                        </Badge>
                                    </Flex>
                                </Flex>
                            </CardBody>
                        </Card>

                        <Flex direction="column" gap="10px">
                            <Card _hover={{ backgroundColor: "gray.400" }}>
                                <CardBody>
                                    <Flex direction="column" gap="20px">
                                        <Box>
                                            <Text fontWeight="bold">제목</Text>
                                            <Input type="text" name="title" value={feed.title} onChange={handleFeedFieldOnChange} />
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold">내용</Text>
                                            <Input type="text" name="content" value={feed.content} onChange={handleFeedFieldOnChange} />
                                        </Box>
                                        <Box>
                                            <FileUpload handleFileOnChange={handleFileOnChange}></FileUpload>
                                        </Box>
                                    </Flex>
                                </CardBody>
                            </Card>
                            <Box>
                            </Box>
                            <Flex direction="row-reverse">
                                <Button type="submit" colorScheme="green">만들기</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </CardBody>
                </Flex>
                </Center>
            </form>
        </Card>
    );
};

export default FeedCreate;