import { Link } from "react-router-dom";
import { Card, CardBody, Flex, Grid, Text } from "@chakra-ui/react";
import UserCard from "../user/UserCard";
import Timestamp from "../../utils/timestamp";

const ExerciseCard = (props) => {
    const { index, userCode, userId, userName, name, content, createDate, modDate } = props.exercise;

    return (
        <Card key={index}>
            <CardBody>
                <Grid templateColumns="repeat(2, 1fr)" h="100%" p="10px" gap="10px" borderRadius="10px">
                    <UserCard user={{ code: userCode, id: userId, name: userName}} />
                    <Card _hover={{backgroundColor: "gray.500"}}>
                        <CardBody>
                            <Link to={`/exercises/${index}`}>
                                <Grid templateColumns="repeat(2, 1fr)" h="100%" p="10px" gap="10px" borderRadius="10px">
                                    <Flex direction="column" gap="10px">
                                        <Text>운동 이름</Text>
                                        <Text>운동법</Text>
                                        <Text>작성일</Text>
                                        <Text>수정일</Text>
                                    </Flex>
                                    <Flex direction="column" gap="10px">
                                        <Text>{name}</Text>
                                        <Text>{content}</Text>
                                        <Text>{Timestamp.convertToDate(createDate)}</Text>
                                        {modDate && <Text>{Timestamp.convertToDate(modDate)}</Text> }
                                    </Flex>
                                </Grid>
                            </Link>
                        </CardBody>
                    </Card>
                </Grid>
            </CardBody>
        </Card>
    );
};

export default ExerciseCard;