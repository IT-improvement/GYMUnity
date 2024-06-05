import { Link } from "react-router-dom";
import { Avatar, Badge, Card, CardBody, Box, Flex, Text, VStack } from "@chakra-ui/react";

const UserCard = (props) => {
    const { code, name, id, profileImage } = props.user;

    return (
        <Card key={code}>
            <CardBody>
                <Box p="10px" bgColor="gray.200" borderRadius="10px"
                    cursor="pointer"
                    _hover={{backgroundColor: "gray.500"}} >
                    <Link to={`/user/${code}`}>
                        <Flex direction="column" align="center" gap="10px">
                            <Avatar src={props.user.profileImage} size="2xl" />
                            <VStack gap="10px">
                                <Text>{name}</Text>
                                <Badge fontSize="15px" colorScheme="pink">
                                    {id}
                                </Badge>
                            </VStack>
                        </Flex>
                    </Link>
                </Box>
            </CardBody>
        </Card>
    );
};

export default UserCard;