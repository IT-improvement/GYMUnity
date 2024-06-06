import { Link } from "react-router-dom";
import { Avatar, Badge, Card, CardBody, Box, Flex, Text, VStack } from "@chakra-ui/react";

const UserCard = (props) => {
    const { code, name, id, profileImage } = props.user;

    return (
        <Card key={code} _hover={{backgroundColor: "gray.500"}}>
            <CardBody>
                <Box h="100%" p="10px" bgColor="gray.100" borderRadius="10px" cursor="pointer">
                    <Link to={`/user/${code}`}>
                        <Flex direction="column" h="100%" justify="center" align="center" gap="10px">
                            <Avatar src={props.user.profileImage} size="xl" />
                            <VStack gap="10px">
                                <Text fontWeight="bold">{name}</Text>
                                <Badge fontSize="15px" colorScheme="blue">
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