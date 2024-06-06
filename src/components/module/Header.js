import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Flex, Heading, Input } from "@chakra-ui/react"
import Context from "../../Context";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();

    const handleSearchButtonOnClick = () => {
        navigate("/search", { state: { searchQuery: searchQuery }});
    };

    return (
        <Flex gap="10px" align="center">
            <Box minW="200px" maxW="300px">
                <Link to="/">
                    <Heading as="h1" fontSize="4xl" p="10px" color="var(--blue)">
                        GymUnity
                    </Heading>
                </Link>
            </Box>
        <Input
            borderWidth="2px"
            onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        <Button onClick={handleSearchButtonOnClick}>&#x1F50D;</Button>
            <Button h="fit-content" p="5px" >
                {isLoggedIn ?
                    <Link to="/user/mypage">
                        <Avatar src={sessionUser.profileImage} size="sm" />
                    </Link>
                    :
                    <Link to="/user/login">로그인</Link>
                }
            </Button>
        </Flex>
    );
}
