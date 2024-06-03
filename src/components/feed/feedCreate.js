import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast, Flex, Box, Select, Heading, FormControl, FormLabel, Button, Text, Input } from "@chakra-ui/react";
import Context from "../../Context";

const FeedCreate = () => {
    const [feed, setFeed] = useState({
        title: "",
        content: "",
    });
    const { isLoggedIn, sessionUser } = useContext(Context);
    const navigate = useNavigate();
    console.log(feed.title)
        console.log(feed.content)
    const fetchFeedCreate = () => {
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/feed?command=feedCreate&title=${feed.title}&content=${feed.content}`, {
            method: "GET", 
            headers: {
                "Authorization": sessionUser.code, 
            }
        
        })
    }



   

    const handleFeedCreateOnSubmit = () => {
        fetchFeedCreate();
        console.log("on sumbi9t");
    };

    const handleFeedFieldOnChange = (e) => {
        setFeed(oldFeed => {
            return {...oldFeed, [e.target.name]: e.target.value};
        });
    };

    console.log(feed)

    return (
        <>
            <form onSubmit={handleFeedCreateOnSubmit}>
                <label>제목</label>
                <input type="text" name="title" onChange={handleFeedFieldOnChange} />
                <label>내용</label>
                <input type="text" name="content" onChange={handleFeedFieldOnChange} />

                <input type="submit" value="피드 저장"/>
                <Button colorScheme="blue" onClick={() => navigate("/feed")}>목록으로 가기</Button>
            </form>
        </>
    );
};

export default FeedCreate;