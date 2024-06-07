import { Link } from "react-router-dom";
import { Card, CardBody, Flex, Table, Tbody, Tr, Td, TableContainer } from "@chakra-ui/react";
import UserCard from "../user/UserCard";
import Timestamp from "../../utils/timestamp";

const ExerciseCard = (props) => {
    const { index, userCode, userId, userName, userProfileImage, name, content, createDate, modDate } = props.exercise;

    return (
        <Card key={index}>
            <CardBody>
                <Flex direction="column" gap="10px">
                    <UserCard user={{ code: userCode, id: userId, name: userName, profileImage: userProfileImage }} />
                    <Card _hover={{backgroundColor: "gray.300"}}>
                        <CardBody>
                            <Link to={`/exercises/${index}`}>
                                <TableContainer overflow="visible">
                                    <Table>
                                        <Tbody>
                                        <Tr>
                                            <Td>운동 이름</Td>
                                            <Td>{name}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>내용</Td>
                                            <Td>{content}</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>작성일</Td>
                                            <Td>{Timestamp.convertToDate(createDate)}</Td>
                                        </Tr>
                                        { modDate &&
                                        <Tr>
                                            <Td>수정일</Td>
                                            <Td>{Timestamp.convertToDate(modDate)}</Td>
                                        </Tr>
                                        }
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Link>
                        </CardBody>
                    </Card>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default ExerciseCard;