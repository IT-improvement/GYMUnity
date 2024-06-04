import { Link } from "react-router-dom";
import { Avatar, Badge, Box,  Card, CardBody, Flex, Grid,  Text, VStack } from "@chakra-ui/react";

const ExerciseCard = (props) => {
    const { index, userCode, userId, userName, name, content, createDate, modDate} = props.exercise;

    return (
        <Card key={index} _hover={{backgroundColor: "gray.500"}} >
            <CardBody>
                <Grid templateColumns="repeat(2, 1fr)" p="10px" gap="10px" borderRadius="10px">
                    <Box p="10px" borderRadius="10px" bgColor="gray.200" cursor="pointer"
                        _hover={{backgroundColor: "gray.400"}} >
                        <Link to={`/user/${userCode}`}>
                            <Flex direction="column" gap="10px" align="center">
                                <Avatar src="" size="2xl"/>
                                <VStack gap="10px">
                                    <Text>{userName}</Text>
                                    <Badge fontSize="15px" colorScheme="pink">
                                        {userId}
                                    </Badge>
                                </VStack>
                            </Flex>
                        </Link>
                    </Box>
                    <Link to={`/exercises/${index}`}>
                        <Flex direction="column" gap="10px">
                            <Text>운동 이름: {name}</Text>
                            <Text>운동법: {content}</Text>
                            <Text>작성일: {createDate}</Text>
                            {modDate && <Text>수정일: {modDate}</Text> }
                        </Flex>
                    </Link>
                </Grid>
            </CardBody>
        </Card>
    );
};

export default ExerciseCard;