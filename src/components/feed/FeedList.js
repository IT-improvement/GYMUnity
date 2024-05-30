import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Avatar, Grid, Box, Card, CardBody, Button, Heading, Text } from "@chakra-ui/react";
import Sort from "../../utils/sort";

const FeedList = ({ searchQuery, isDescOrder }) => {
    const [feeds, setFeeds] = useState([]);

    const fetchFeeds = () => { 
        let apiPath = "feed?command=feedRead";

        if (searchQuery) apiPath = `feed?command=feedReadByQuery&query=${searchQuery}`;

        fetch(`${process.env.REACT_APP_SERVER_URL}/${apiPath}`)
        .then(response => response.json())
        .then(data =>  {
            setFeeds(data);
        })
        .catch(err => {
        })
        .finally(() => {
        });
    };

    const sortFeeds = () => {
        if (isDescOrder) {
            setFeeds(Sort.ObjectArrayInDescOrder(feeds, "createDate"));
        } else {
            setFeeds(Sort.ObjectArrayInAsecOrder(feeds, "createDate"));
        }
    };

    useEffect(() => {
        fetchFeeds();
    }, [searchQuery]);

    useEffect(() => {
        sortFeeds();
    }, [isDescOrder]);

    const showFeeds = () => {
        return (
            feeds.map((feed) => {
            return (
                <Card key={feed.feedIndex}>
                    <CardBody>
                        <Link to={`/feed/detail/${feed.feedIndex}`}>
                            <Flex>
                                <Text>{feed.userCode}</Text>
                            </Flex>

                            <Text>{feed.title}</Text>
                            <Text>{feed.content}</Text>
                            <Text>{feed.createDate}</Text>
                            <Text>{feed.comments}</Text>
                        </Link>
                    </CardBody>
                </Card>  
                )
            })
        );
    };

    useEffect(() => {
        fetchFeeds()
    }, [searchQuery]);

    useEffect(() => {
    }, [isDescOrder]);

    return (
        <Flex direction="column" gap="10px">
            <Heading>게시글 목록</Heading>
                {feeds.length > 0 ?
                <Flex direction="column" gap="10px">
                    {showFeeds()}
                </Flex>
                :
            <Heading fontSize="20px">게시글이 없습니다</Heading>}
        </Flex>
    );
};

export default FeedList;