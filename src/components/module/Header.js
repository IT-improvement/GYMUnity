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
        <Flex gap="10px" align="center" height="100px">
            <Box minW="200px" maxW="300px">
                <Link to="/">
                    <Heading as="h1" fontSize="4xl" p="10px" color="var(--blue)">
                        GymUnity
                    </Heading>
                </Link>
            </Box>
        <Input
            borderWidth="2px" width="84%"
            onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        <Button width="50px" height="50px" onClick={handleSearchButtonOnClick}>&#x1F50D;</Button>
            <Button h="fit-content" p="5px" width="100px" height="50px">
                {isLoggedIn ?
                    <Link to="/user/mypage">
                        <Avatar src="" size="sm" />
                    </Link>
                    :
                    <Link to="/user/login">로그인</Link>
                }
            </Button>
        </Flex>
    );
}
